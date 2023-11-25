import { GetProductOutput } from "@custom-types/manager";
import { useAppSelector } from "hooks/use-redux";
import { cloneDeep, get } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { rootAction } from "redux/reducers/root-reducer";
import { Flex, FlexColumn } from "styles/common";
import { getKeyCart } from "utils/cart";
import CartItem from "./cart-item";
import { ListOrdersWrapper, TableContent, TableHeader } from "./styled";
import { Button } from "@material-tailwind/react";
import useActionApi from "hooks/use-action-api";
import { getProducts } from "api/manager";
import { Alert } from "components/alert";

interface ListOrdersProps {
  currentKeyOrder: string;
  lists: GetProductOutput[];
  onClose: (value: string) => void;
  onSaveCart: (type: string) => void;
}

const ListOrders = ({ onSaveCart, currentKeyOrder, lists, onClose }: ListOrdersProps) => {
  const dispatch = useDispatch();
  const { orderCarts } = useAppSelector((r) => r.rootReducer);
  const [quantity, setQuantity] = useState();

  const handleIncreaseProduct = (product_code, quantity) => {
    if (quantity < 99) {
      let productCurrent = cloneDeep(lists);

      productCurrent = productCurrent.map((element) => {
        if (element.product_code == product_code) {
          return {
            ...element,
            product_quantity: quantity + 1,
          };
        } else {
          return element;
        }
      });

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

  const handleDecreaseProduct = (product_code, quantity) => {
    if (quantity > 1) {
      let productCurrent = cloneDeep(lists);

      productCurrent = productCurrent.map((element) => {
        if (element.product_code == product_code) {
          return {
            ...element,
            product_quantity: quantity - 1,
          };
        } else {
          return element;
        }
      });

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

  const handleChangeValue = (product_code, quantity) => {
    if (quantity > 99) quantity = 99;

    if (Number(quantity) >= 0) {
      let productCurrent = cloneDeep(lists);

      productCurrent = productCurrent.map((element) => {
        if (element.product_code == product_code) {
          return {
            ...element,
            product_quantity: Number(quantity),
          };
        } else {
          return element;
        }
      });

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
  const actionGetProducts = useActionApi(getProducts);
  const [listsProducts, setListProducts] = useState<GetProductOutput[]>();

  // gọi api products
  useEffect(() => {
    actionGetProducts(
      {
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
  }, []);

  return (
    <ListOrdersWrapper>
      <>
        <div className="container mx-auto ">
          <div className="flex ">
            <div className="w-full ">
              <Flex justify="flex-end">
                <Button variant="outlined" size="sm" onClick={() => onSaveCart("draff")}>
                  Lưu tạm
                </Button>
              </Flex>

              <FlexColumn className="w-full" gap={16} gapMb={16}>
                <TableHeader className="flex mt-10 w-full hide-mobile">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Tên sản phẩm</h3>
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5">Mã code</h3>
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5">Số lượng</h3>
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 ">Giá</h3>
                  <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5">Tổng</h3>
                </TableHeader>

                <TableContent className="w-full mt-5 flex-col">
                  {lists?.map((item, index) => (
                    <CartItem
                      listsProducts={listsProducts}
                      quantity={quantity}
                      setQuantity={setQuantity}
                      onChange={handleChangeValue}
                      index={index + 1}
                      key={item.product_code}
                      item={item}
                      onClose={onClose}
                      onIncrease={handleIncreaseProduct}
                      onDecrease={handleDecreaseProduct}
                    />
                  ))}
                </TableContent>
              </FlexColumn>
            </div>
          </div>
        </div>
      </>
    </ListOrdersWrapper>
  );
};

export default ListOrders;
