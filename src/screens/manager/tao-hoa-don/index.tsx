import { GetCartsOutput, GetProductOutput, ShowModal } from "@custom-types/manager";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Spinner } from "@material-tailwind/react";
import { addNewCarts, checkoutConfirm, deleteCarts, getAllCarts, getProducts, updateCarts } from "api/manager";
import { Alert } from "components/alert";
import DropDown from "components/dropdown-fieldset";
import IconClose from "components/icons/source/close";
import ModalCustom from "components/modal-custom";
import CardSlide from "components/slide";
import useActionApi from "hooks/use-action-api";
import useInitialized from "hooks/use-initialized";
import { useAppSelector } from "hooks/use-redux";
import { get, pick } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { rootAction } from "redux/reducers/root-reducer";
import CardItem from "section/manager/tao-hoa-don/card";
import Invoice from "section/manager/tao-hoa-don/invoice";
import TabsOrder from "section/manager/tao-hoa-don/tab-orders";
import { convertKeyCart, getKeyCart } from "utils/cart";
import {
  ButtonCartWrapper,
  CardInsuranceItemWrapper,
  DropdownWrapper,
  HeaderWrapper,
  ListProductsWrapper,
  SlideWrapper,
  TaoHoaDonScreenWrapper,
} from "./styled";
import useWindowResize from "hooks/use-window-resize";
import useDebounce from "hooks/use-debounce";
import Empty from "components/empty";

interface TaoHoaDonScreenProps {}

export interface GetProductOutputCustom extends GetCartsOutput {
  label?: string;
  value?: string;
}
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

const TaoHoaDonScreen = ({}: TaoHoaDonScreenProps) => {
  const dispatch = useDispatch();

  const [reLoading, setReloading] = useState(false);
  const [listsProducts, setListProducts] = useState<GetProductOutput[]>();
  const [currentKeyOrder, setCurrentKeyOrder] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const size = useWindowResize();
  const debounceSearchText = useDebounce(searchText, 500);

  const [showModal, setShowModal] = useState<ShowModal>({
    type: null,
    show: false,
    data: null,
    title: "",
  });

  const [showModalOrder, setShowModalOrder] = useState<ShowModal>({
    type: null,
    show: false,
    data: null,
    title: "",
  });

  const {
    orderCarts,
    currentUser,
    cacheData,
    loading: { loadingCreateCart, getProductsLoading },
  } = useAppSelector((r) => r.rootReducer);

  const actionGetProducts = useActionApi(getProducts);
  const actionDeleteCarts = useActionApi(deleteCarts);
  const actionGetAllCarts = useActionApi(getAllCarts);
  const actionAddNewCarts = useActionApi(addNewCarts);
  const actionUpdateCarts = useActionApi(updateCarts);

  const actionCheckoutConfirm = useActionApi(checkoutConfirm);
  useEffect(() => {
    if (cacheData?.cart) {
      setCurrentKeyOrder(cacheData?.cart?.currentKeyOrder);
    }
  }, [cacheData?.cart]);

  useInitialized(() => {
    if (currentUser || reLoading) {
      actionGetAllCarts(
        {
          limit: "",
          sortOrder: "DESC",
          // sortOrder: "ASC",
          sortBy: "createdAt",
          page: "",
          filter: {
            cart_state: "active",
          },
          select: null,
        },
        {
          type: "global",
          name: "",
        }
      )
        .then(({ data }) => {
          if (data.status == "1") {
            if (data.data.products.length) {
              const newOrderCarts = data.data.products.map((elem, index) => {
                return Object.assign({}, pick(elem, `hoa-don-${elem.id}`), {
                  [`hoa-don-${elem.id}`]: {
                    id: elem.id,
                    products: JSON.parse(String(elem.cart_products)),
                  },
                });
              });

              dispatch(rootAction.setOrderCarts(newOrderCarts));
            }
          } else {
            Alert("ERROR", data.message);
          }
        })
        .catch((e) => console.log(get(e, "response.data.message")));
    }
  }, [reLoading]);

  // gọi api products
  useEffect(() => {
    if (currentUser || reLoading || debounceSearchText) {
      actionGetProducts(
        {
          searchText: debounceSearchText,
          limit: "",
          sortOrder: "DESC",
          // sortOrder: "ASC",
          sortBy: "createdAt",
          page: "",
          filter: {},
          select: null,
          priceMin: null,
          priceMax: null,
        },
        {
          type: "local",
          name: "getProductsLoading",
        }
      )
        .then(({ data }) => {
          if (data.status == "1") {
            setListProducts(data.data.products);
          } else {
            Alert("ERROR", data.message);
          }
        })
        .catch((e) => console.log(get(e, "response.data.message")));
    }
  }, [currentUser, reLoading, debounceSearchText]);

  // Lấy ra product trong hoá đơn hiện tại mà user chọn
  const dataProductInCartCurrent: any = useMemo(() => {
    return orderCarts?.length > 0 && orderCarts?.find((item) => item[currentKeyOrder]);
  }, [currentKeyOrder, orderCarts]);

  const handleAddCart = () => {
    if (orderCarts.length < 5) {
      actionAddNewCarts(
        {
          products: [],
        },
        {
          type: "local",
          name: "loadingCreateCart",
        }
      )
        .then(({ data }) => {
          if (data.status == "1") {
            const newCart = {
              [`hoa-don-${data.data.id}`]: {
                id: data.data.id,
                products: [],
              },
            };
            setCurrentKeyOrder(`hoa-don-${data.data.id}`);
            dispatch(rootAction.setOrderCarts(orderCarts ? [...orderCarts, newCart] : [newCart]));
          } else {
            Alert("ERROR", data.message);
          }
        })
        .catch((e) => console.log(get(e, "response.data.message")));
    } else {
      Alert("WARNING", "Bạn chỉ được tạo tối đa 5 Hoá đơn");
    }
  };

  const handleSaveDraffOrder = async (type) => {
    if (currentKeyOrder && orderCarts?.length > 0) {
      const dataCartCurrent: any = dataProductInCartCurrent[currentKeyOrder];
      //all api checkout để get thông tín sản phẩm.
      await actionUpdateCarts(
        {
          id: dataCartCurrent?.id,
          products: dataCartCurrent?.products,
        },
        {
          type: "global",
          name: "",
        }
      )
        .then(({ data }) => {
          if (data.status == "1") {
            const newOrderCarts = orderCarts.map((elem, index) => {
              const { id, products } = elem[getKeyCart(elem)];

              return Object.assign({}, elem, {
                [getKeyCart(elem)]: {
                  id: id ? id : data.data.id,
                  products: products,
                },
              });
            });
            setShowModal({
              show: false,
            });

            dispatch(rootAction.setOrderCarts(newOrderCarts));

            if (type == "draff") {
              Alert("SUCCESSFUL", "Hoá đơn của bạn đã được lưu lại!");
            }
          } else {
            Alert("ERROR", data.message);
          }
        })
        .catch((e) => console.log(get(e, "response.data.message")));
    } else {
      Alert("WARNING", "Vui lòng chọn hoá đơn trước khi lưu!");
    }
  };

  const handleCancelCart = async () => {
    if (showModal.data) {
      const newOrderCarts = orderCarts.filter((item) => !item[currentKeyOrder]);
      //if cart in database, call api for delete. If it don`t db, delete in local storage
      if (showModal.data[currentKeyOrder].id) {
        await actionDeleteCarts(
          {
            id: showModal.data[currentKeyOrder].id,
          },
          {
            type: "global",
            name: "",
          }
        )
          .then(({ data }) => {
            if (data.status == "1") {
              dispatch(rootAction.setOrderCarts(newOrderCarts));

              dispatch(
                rootAction.setCacheData({
                  cart: {
                    currentKeyOrder: null,
                  },
                })
              );
            } else {
              Alert("ERROR", data.message);
            }
          })
          .catch((e) => console.log(get(e, "response.data.message")));
      } else {
        dispatch(rootAction.setOrderCarts(newOrderCarts));
      }

      setShowModal({
        show: false,
      });
    }
  };

  const handleAddItemToCart = ({
    product_code,
    product_name,
    product_price_sell,
    product_quantity,
  }: GetProductOutput) => {
    if (product_quantity == 0) {
      Alert("WARNING", `Sản phẩm ${product_code} đã hết hàng! Vui lòng chọn sản phẩm khác`);
      return;
    }
    if (dataProductInCartCurrent && currentKeyOrder && orderCarts.length > 0) {
      const newProduct = {
        product_code,
        product_name,
        product_price_sell,
        product_quantity: 1,
      };

      let products = dataProductInCartCurrent[currentKeyOrder]?.products;

      //2 sản phẩm giống nhau, thì tăng số lượng lên
      // nếu như sản phẩm đã có trong list products thì update số lượng lên ++
      const foundProduct = products.find((item) => item.product_code == product_code);

      //Check xem sản phẩm đã tồntại trong list chưa, nếu ch tại trong list chưa, nếu chưa thì sẽ update lại số lượng thôi
      if (foundProduct) {
        products = products.map((element) => {
          if (element.product_code == product_code) {
            return {
              ...element,
              product_quantity: element.product_quantity + 1,
            };
          } else {
            return element;
          }
        });
      } else {
        // thêm sản phẩm mới vào carts
        products = [...products, newProduct];
      }

      let productCurrent = products ? products : [newProduct];

      const newOrderCarts = orderCarts.map((elem, index) => {
        const { id, products } = elem[getKeyCart(elem)];

        return Object.assign({}, elem, {
          [getKeyCart(elem)]: {
            id: id,
            products: getKeyCart(elem) == currentKeyOrder ? productCurrent : products,
          },
        });
      });

      dispatch(rootAction.setOrderCarts(newOrderCarts));
    } else {
      if (orderCarts?.length > 0) {
        Alert("WARNING", "Vui lòng chọn vào hoá đơn trước khi thêm sản phẩm!");
      } else {
        Alert("WARNING", "Vui lòng tạo hoá đơn trước khi thêm sản phẩm!");
      }
    }
  };

  const handleRemoveItemCarts = (product_code: string) => {
    if (currentKeyOrder) {
      let products = dataProductInCartCurrent[currentKeyOrder].products;

      let productCurrent = products ? products.filter((item) => item.product_code !== product_code) : [products];

      const newOrderCarts = orderCarts.map((elem, index) => {
        const { id, products } = elem[getKeyCart(elem)];

        return Object.assign({}, elem, {
          [getKeyCart(elem)]: {
            id: id,
            products: getKeyCart(elem) == currentKeyOrder ? productCurrent : products,
          },
        });
      });

      dispatch(rootAction.setOrderCarts(newOrderCarts));
    }
  };

  const handleReviewOrder = async () => {
    await handleSaveDraffOrder("submit");

    setShowModalOrder({
      show: true,
      title: "Thanh toán",
      data: dataProductInCartCurrent[currentKeyOrder].id,
    });
  };

  const handleSubmitOrder = async () => {
    if (showModalOrder.data) {
      actionCheckoutConfirm(
        {
          id: showModalOrder.data,
        },
        {
          type: "global",
          name: "",
        }
      )
        .then(async ({ data }) => {
          if (data.status == "1") {
            const newOrderCarts = orderCarts.filter((item) => !item[currentKeyOrder]);
            Alert("SUCCESSFUL", data.message);

            setShowModalOrder({
              show: false,
            });

            dispatch(rootAction.setOrderCarts([...newOrderCarts]));
            setReloading(true);

            dispatch(
              rootAction.setCacheData({
                cart: {
                  currentKeyOrder: null,
                },
              })
            );
          } else {
            Alert("ERROR", data.message);
          }
        })
        .catch((e) => {
          console.log(get(e, "response.data.message"));
        });
    }
  };

  //handle scan product_bar_code
  let barcodeScan = "";
  const [barcodeDisplay, setBarcodeDisplay] = useState("");

  const handleScan = (barcodeString) => {
    setBarcodeDisplay(barcodeString);
    const productCurrent = listsProducts && listsProducts.find((i) => i.product_bar_code == barcodeString);
    handleAddItemToCart(productCurrent);
  };

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.keyCode == 13 && barcodeScan.length > 3) {
        handleScan(barcodeScan);
        return;
      }
      if (e.keyCode == 16) {
        return;
      }

      barcodeScan += e.key;

      setTimeout(() => {
        barcodeScan = "";
      }, 100);
      //Push Keycode to barcode scan variable
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [barcodeDisplay]);

  return (
    <TaoHoaDonScreenWrapper>
      <HeaderWrapper gapMb={16} align="center" justify="space-between" style={{ position: "sticky", top: 100 }}>
        <DropdownWrapper className="">
          <DropDown
            setSearchText={setSearchText}
            isChildren
            list={[]}
            loading={Boolean(getProductsLoading)}
            value={"null"}
            onChange={(e, o) => {}}
            isSearch
          >
            <ListProductsWrapper>
              {listsProducts?.map((item: GetProductOutput) => (
                <CardItem onClick={handleAddItemToCart} item={item} key={item.product_code} />
              ))}

              {listsProducts?.length === 0 && <Empty text="Không có dữ liệu" />}
            </ListProductsWrapper>
          </DropDown>
        </DropdownWrapper>

        <ButtonCartWrapper gap={16} gapMb={8} align="center" justify="flex-end">
          <SlideWrapper>
            <CardSlide col={size.width > 786 ? 4 : 2} showButton={true} length={orderCarts.length}>
              {orderCarts.map((item, index) => (
                <CardInsuranceItemWrapper col={size.width > 786 ? 5 : 2} key={index}>
                  <Button
                    color="green"
                    style={{ background: getKeyCart(item) == currentKeyOrder && "#E87722" }}
                    onClick={() => {
                      setCurrentKeyOrder(getKeyCart(item));

                      dispatch(
                        rootAction.setCacheData({
                          cart: {
                            currentKeyOrder: getKeyCart(item),
                          },
                        })
                      );
                    }}
                    key={item.value}
                    className="flex items-center p-8 w-full flex justify-between align-center"
                  >
                    <span className="mr-2">{convertKeyCart(item)}</span>
                    <span
                      onClick={() =>
                        setShowModal({
                          show: true,
                          data: item,
                          title: `Đóng đặt hàng ${convertKeyCart(item)}`,
                        })
                      }
                    >
                      <IconClose color="white" />
                    </span>
                  </Button>
                </CardInsuranceItemWrapper>
              ))}
            </CardSlide>
          </SlideWrapper>

          <Button disabled={Boolean(loadingCreateCart)} color="green" onClick={() => handleAddCart()}>
            {loadingCreateCart ? <Spinner className="h-4 w-4" /> : <PlusIcon height={14} width={14} />}
          </Button>
        </ButtonCartWrapper>
      </HeaderWrapper>

      <TabsOrder
        onSaveCart={handleSaveDraffOrder}
        onReview={handleReviewOrder}
        currentKeyOrder={currentKeyOrder}
        dataCurrentOrder={dataProductInCartCurrent ? dataProductInCartCurrent[currentKeyOrder].products : []}
        handleRemoveItemCarts={handleRemoveItemCarts}
      />

      {showModal.show && (
        <ModalCustom
          show={showModal.show}
          onCloseModal={() => {
            setShowModal({
              show: false,
            });
          }}
          title={showModal.title}
          primaryBtn={{
            text: "Đồng ý",
            onClick: handleCancelCart,
          }}
          secondaryBtn={{
            text: "Bỏ qua",
            onClick: () =>
              setShowModal({
                show: false,
              }),
          }}
        >
          Thông tin của Đặt hàng sẽ không được lưu lại. Bạn có chắc chắn muốn đóng không?
        </ModalCustom>
      )}

      {showModalOrder.show && (
        <ModalCustom
          show={showModalOrder.show}
          onCloseModal={() => {
            setShowModalOrder({
              show: false,
            });
          }}
          title={showModalOrder.title}
          primaryBtn={{
            text: "Xác nhận",
            onClick: handleSubmitOrder,
          }}
          secondaryBtn={{
            text: "Quay lại",
            onClick: () =>
              setShowModalOrder({
                show: false,
              }),
          }}
        >
          <Invoice data={showModalOrder.data} />
        </ModalCustom>
      )}
    </TaoHoaDonScreenWrapper>
  );
};

export default TaoHoaDonScreen;
