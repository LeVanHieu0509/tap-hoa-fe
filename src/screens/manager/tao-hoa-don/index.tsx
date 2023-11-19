import { GetCartsOutput, GetProductOutput, ShowModal } from "@custom-types/manager";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, ButtonGroup, Spinner } from "@material-tailwind/react";
import { addNewCarts, checkoutConfirm, deleteCarts, getAllCarts, getProducts, updateCarts } from "api/manager";
import { Alert } from "components/alert";
import DropDown from "components/dropdown-fieldset";
import IconClose from "components/icons/source/close";
import ModalCustom from "components/modal-custom";
import useActionApi from "hooks/use-action-api";
import useInitialized from "hooks/use-initialized";
import { useAppSelector } from "hooks/use-redux";
import { pick } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { rootAction } from "redux/reducers/root-reducer";
import CardItem from "section/manager/tao-hoa-don/card";
import Invoice from "section/manager/tao-hoa-don/invoice";
import TabsOrder from "section/manager/tao-hoa-don/tab-orders";
import { Flex } from "styles/common";
import { convertKeyCart, getKeyCart } from "utils/cart";
import { ListProductsWrapper, TaoHoaDonScreenWrapper } from "./styled";

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
    loading: { loadingCreateCart },
  } = useAppSelector((r) => r.rootReducer);

  const actionGetProducts = useActionApi(getProducts);
  const actionDeleteCarts = useActionApi(deleteCarts);
  const actionGetAllCarts = useActionApi(getAllCarts);
  const actionAddNewCarts = useActionApi(addNewCarts);
  const actionUpdateCarts = useActionApi(updateCarts);

  const actionCheckoutConfirm = useActionApi(checkoutConfirm);

  useInitialized(() => {
    // if (cacheData?.cart) {
    //   setCurrentKeyOrder(cacheData?.cart?.currentKeyOrder);
    // }
    if (currentUser || reLoading) {
      actionGetAllCarts(
        {
          limit: "",
          sortOrder: "",
          sortBy: "",
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
        .catch((e) => console.log(e));
    }
  }, [reLoading]);

  // gọi api products
  useEffect(() => {
    if (currentUser || reLoading) {
      actionGetProducts(
        {
          limit: "",
          sortOrder: "",
          sortBy: "",
          page: "",
          filter: {},
          select: null,
          priceMin: null,
          priceMax: null,
        },
        {
          type: "global",
          name: "",
        }
      )
        .then(({ data }) => {
          if (data.status == "1") {
            setListProducts(data.data.products);
          } else {
            Alert("ERROR", data.message);
          }
        })
        .catch((e) => e);
    }
  }, [currentUser, reLoading]);

  // Lấy ra product trong hoá đơn hiện tại mà user chọn
  const dataProductInCartCurrent: any = useMemo(() => {
    return orderCarts?.length > 0 && orderCarts?.find((item) => item[currentKeyOrder]);
  }, [currentKeyOrder, orderCarts]);

  const handleAddCart = () => {
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
      .catch((e) => e);
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
        .catch((e) => e);
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
            } else {
              Alert("ERROR", data.message);
            }
          })
          .catch((e) => e);
      } else {
        dispatch(rootAction.setOrderCarts(newOrderCarts));
      }

      setShowModal({
        show: false,
      });
    }
  };

  const handleAddItemToCart = ({ product_code, product_name, product_price_sell }: GetProductOutput) => {
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
          } else {
            Alert("ERROR", data.message);
          }
        })
        .catch((e) => {
          Alert("ERROR", e);
        });
    }
  };

  return (
    <TaoHoaDonScreenWrapper>
      <Flex justify="space-between" style={{ position: "sticky", top: 100 }}>
        <Flex className="" style={{ width: 400 }}>
          <DropDown
            setSearchText={setSearchText}
            isChildren
            list={[]}
            loading={false}
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
        </Flex>

        <Flex gap={16} gapMb={8} align="center" justify="flex-end">
          <ButtonGroup size="sm" className="flex w-max flex-row gap-4 " color="teal">
            {orderCarts?.length > 0 &&
              orderCarts?.map((item) => (
                <Button
                  style={{ background: getKeyCart(item) == currentKeyOrder && "#e87722" }}
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
                  className="flex items-center gap-3 "
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
              ))}
          </ButtonGroup>

          <Button disabled={Boolean(loadingCreateCart)} color="green" onClick={() => handleAddCart()}>
            {loadingCreateCart ? <Spinner className="h-4 w-4" /> : <PlusIcon height={14} width={14} />}
          </Button>
        </Flex>
      </Flex>

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
