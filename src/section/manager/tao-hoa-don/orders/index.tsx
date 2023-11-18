import { GetProductOutput } from "@custom-types/manager";
import { useAppSelector } from "hooks/use-redux";
import { cloneDeep } from "lodash";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { rootAction } from "redux/reducers/root-reducer";
import { FlexColumn } from "styles/common";
import { getKeyCart } from "utils/cart";
import CartItem from "./cart-item";
import { ListOrdersWrapper } from "./styled";

interface ListOrdersProps {
  currentKeyOrder: string;
  lists: GetProductOutput[];
  onClose: (value: string) => void;
}

const ListOrders = ({ currentKeyOrder, lists, onClose }: ListOrdersProps) => {
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

  return (
    <ListOrdersWrapper>
      <>
        <div className="container mx-auto ">
          <div className="flex ">
            <div className="w-full ">
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Tên sản phẩm</h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Số lượng
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Giá</h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/6 text-center">Tổng</h3>
              </div>

              <FlexColumn className="w-full" gap={16} gapMb={16}>
                {lists?.map((item, index) => (
                  <CartItem
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
              </FlexColumn>
            </div>
          </div>
        </div>
      </>
    </ListOrdersWrapper>
  );
};

export default ListOrders;
