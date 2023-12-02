import { GetCartsOutput, GetProductOutput, ShowModal } from "@custom-types/manager";
import { IconButton } from "@material-tailwind/react";
import {
  addNewCarts,
  checkoutConfirm,
  deleteCarts,
  getAllCarts,
  getProduct,
  getProducts,
  updateCarts,
} from "api/manager";
import { Alert } from "components/alert";
import DropDown from "components/dropdown-fieldset";
import EmptyComp from "components/empty-cart";
import IconClose from "components/icons/source/close";
import ModalCustom from "components/modal-custom";
import Modal from "components/modal-dom";
import useActionApi from "hooks/use-action-api";
import useDebounce from "hooks/use-debounce";
import useInitialized from "hooks/use-initialized";
import { useAppSelector } from "hooks/use-redux";
import useWindowResize from "hooks/use-window-resize";
import { get, pick } from "lodash";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { rootAction } from "redux/reducers/root-reducer";
import CardItem from "section/manager/tao-hoa-don/card";
import Invoice from "section/manager/tao-hoa-don/invoice";
import TabsOrder from "section/manager/tao-hoa-don/tab-orders";
import { ButtonPrimary, ButtonSecondary } from "styles/buttons";
import { getKeyCart } from "utils/cart";
import { DropdownWrapper, HeaderWrapper, ListProductsWrapper, TaoHoaDonScreenWrapper } from "./styled";

interface TaoHoaDonScreenProps {}

const ScanBarCode = dynamic(() => import("components/scan-barcode"), { ssr: false });

export interface GetProductOutputCustom extends GetCartsOutput {
  label?: string;
  value?: string;
}
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

const TaoHoaDonScreen = ({}: TaoHoaDonScreenProps) => {
  const dispatch = useDispatch();
  const size = useWindowResize();

  const [reLoading, setReloading] = useState(false);
  const [listsProducts, setListProducts] = useState<GetProductOutput[]>();
  const [currentKeyOrder, setCurrentKeyOrder] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [productBarCode, setProductBarCode] = useState(null);
  const [showScan, setShowScan] = useState(false);
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

  const debounceSearchText = useDebounce(searchText, 500);

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
  const actionGetProduct = useActionApi(getProduct);
  const actionCheckoutConfirm = useActionApi(checkoutConfirm);

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
            usr_id: currentUser?.user?.usr_id,
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
            if (data.data.products.length > 0) {
              const newOrderCarts = data.data.products.map((elem, index) => {
                return Object.assign({}, pick(elem, `hoa-don-${elem.id}`), {
                  [`hoa-don-${elem.id}`]: {
                    id: elem.id,
                    products: JSON.parse(String(elem.cart_products)),
                  },
                });
              });
              dispatch(
                rootAction.setCacheData({
                  cart: {
                    currentKeyOrder: `hoa-don-${data.data.products[0].id}`,
                  },
                })
              );
              setCurrentKeyOrder(`hoa-don-${data.data.products[0].id}`);
              dispatch(rootAction.setOrderCarts(newOrderCarts));
            } else {
              dispatch(rootAction.setCacheData({}));
              setCurrentKeyOrder(null);
              dispatch(rootAction.setOrderCarts([]));
            }
          } else {
            Alert("ERROR", data.message);
          }
        })
        .catch((e) => console.log(get(e, "response.data.message")));
    }
  }, [reLoading]);

  //save cart when product cache empty

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
    if (orderCarts.length < 1) {
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
            dispatch(
              rootAction.setCacheData({
                cart: {
                  currentKeyOrder: `hoa-don-${data.data.id}`,
                },
              })
            );

            setCurrentKeyOrder(`hoa-don-${data.data.id}`);
            dispatch(rootAction.setOrderCarts(orderCarts ? [...orderCarts, newCart] : [newCart]));
          } else {
            Alert("ERROR", data.message);
          }
        })
        .catch((e) => console.log(get(e, "response.data.message")));
    } else {
      return;
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

  const handleRemoveItemCarts = async (product_code: string) => {
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

      await actionUpdateCarts(
        {
          id: dataProductInCartCurrent[currentKeyOrder]?.id,
          products: productCurrent,
        },
        {
          type: "global",
          name: "",
        }
      );

      dispatch(rootAction.setOrderCarts(newOrderCarts));
    }
  };

  const handleReviewOrder = async () => {
    await handleSaveDraffOrder("submit");

    setShowModalOrder({
      show: true,
      title: "Thanh toán",
      data: { id: dataProductInCartCurrent[currentKeyOrder].id },
    });
  };

  const handleSubmitOrder = async () => {
    if (showModalOrder.data) {
      actionCheckoutConfirm(showModalOrder.data, {
        type: "global",
        name: "",
      })
        .then(async ({ data }) => {
          if (data.status == "1") {
            Alert("SUCCESSFUL", data.message);

            setShowModalOrder({
              show: false,
            });

            dispatch(rootAction.setOrderCarts([]));
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
  const handleScan = (barcodeString) => {
    const productCurrent = listsProducts && listsProducts.find((i) => i.product_bar_code == barcodeString);

    if (productCurrent) {
      handleAddItemToCart(productCurrent);
    } else {
      Alert("WARNING", "Sản phẩm chưa được thêm vào kho, vui lòng kiểm tra lại!");
    }
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
  });

  useEffect(() => {
    if (productBarCode && size.width <= 876) {
      actionGetProduct(
        {
          product_bar_code: productBarCode,
        },
        {
          type: "global",
          name: "",
        }
      ).then(({ data }) => {
        if (data.status == "1") {
          if (data.data?.product_bar_code) {
            handleAddItemToCart(data.data);
          } else {
            Alert("ERROR", "Không tìm thấy sản phẩm! vui lòng nhập tên, mã để tìm kiếm!");
          }
        } else {
          Alert("ERROR", "Quét thất bại! Vui lòng thử lại");
        }
      });
    }
  }, [productBarCode]);

  const handleChange = (key, value) => {
    setProductBarCode(value);
  };

  return (
    <TaoHoaDonScreenWrapper>
      {orderCarts?.length == 1 ? (
        <>
          <HeaderWrapper gapMb={16} align="center" justify="space-between">
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
                </ListProductsWrapper>
              </DropDown>
            </DropdownWrapper>

            {size.width < 786 && showScan ? (
              <div className="w-full">
                <ScanBarCode hide={true} onChange={handleChange} />
              </div>
            ) : null}

            {/* <ButtonCartWrapper align="center" justify="flex-end" className="mr-16">
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
                    className="flex items-center p-6 w-full flex justify-between align-center "
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
        </ButtonCartWrapper> */}

            {/* <Button
          disabled={Boolean(loadingCreateCart) || orderCarts?.length == 1}
          color="green"
          onClick={() => handleAddCart()}
        >
          {loadingCreateCart ? <Spinner className="h-4 w-4" /> : <PlusIcon height={14} width={14} />}
        </Button> */}
          </HeaderWrapper>
          <TabsOrder
            onSaveCart={handleSaveDraffOrder}
            onReview={handleReviewOrder}
            currentKeyOrder={currentKeyOrder}
            dataCurrentOrder={dataProductInCartCurrent ? dataProductInCartCurrent[currentKeyOrder].products : []}
            handleRemoveItemCarts={handleRemoveItemCarts}
          />
        </>
      ) : (
        <EmptyComp loadingCreateCart={loadingCreateCart} onClick={handleAddCart} />
      )}

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
        <Modal
          size="md"
          sizeMobile="md"
          showModal={showModalOrder.show}
          onClose={() => {
            setShowModalOrder({
              show: false,
            });
          }}
          title={showModalOrder.title}
          actions={
            <>
              <ButtonSecondary
                onClick={() =>
                  setShowModalOrder({
                    show: false,
                  })
                }
              >
                Quay lại
              </ButtonSecondary>
              ,<ButtonPrimary onClick={handleSubmitOrder}>Xác nhận</ButtonPrimary>
            </>
          }
        >
          <Invoice data={showModalOrder.data} />
        </Modal>
      )}

      <IconButton
        size="lg"
        color="white"
        className="fixed bottom-36 right-2 z-40 rounded-full shadow-blue-gray-900/10 hide-desktop"
        ripple={false}
        onClick={() => {
          setProductBarCode(null);
          setShowScan(!showScan);
        }}
      >
        {showScan ? (
          <IconClose />
        ) : (
          <svg
            className="h-5 w-5"
            style={{ cursor: "pointer" }}
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5zM3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z" />
          </svg>
        )}
      </IconButton>
    </TaoHoaDonScreenWrapper>
  );
};

export default TaoHoaDonScreen;
