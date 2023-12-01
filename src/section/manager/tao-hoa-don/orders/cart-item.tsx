import { GetProductOutput } from "@custom-types/manager";
import { Tooltip } from "@material-tailwind/react";
import IconError from "components/icons/source/error-icon";
import { useMemo } from "react";
import { ButtonIcon } from "styles/buttons";
import { Flex } from "styles/common";
import { formatCurrency } from "utils/format-value";
import { CartItemWrapper, MobileWrapper } from "./styled";

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
        clipRule="evenodd"
      />
    </svg>
  );
}
interface CartItemProps {
  item: GetProductOutput;
  index: number;
  onClose: (value: string) => void;
  onDecrease: (id: string, quantity: number) => void;
  onIncrease: (value: string, quantity: number) => void;
  onChange: (data: string, quantity: any) => void;
  setQuantity: any;
  quantity: string;
  listsProducts: GetProductOutput[];
}

const CartItem = ({
  onIncrease,
  onDecrease,
  item,
  index,
  onClose,
  onChange,
  quantity,
  setQuantity,
  listsProducts,
}: CartItemProps) => {
  const productCurrent = useMemo(
    () => listsProducts && listsProducts.find((i) => i.product_code == item.product_code),
    [item]
  );

  return (
    <CartItemWrapper className=" w-full shadow-md rounded-xl hover:bg-gray-100 hover:rounded-xl py-3 px-3">
      <div className="w-full z-10  hide-mobile">
        <div className="flex items-center">
          <div className="flex w-2/5">
            <span className="font-bold text-sm mb-2">{`${index}, ${item.product_name}`}</span>
          </div>
          <div className="flex w-1/5">
            <span className="font-bold text-sm mb-2">{` ${item.product_code}`}</span>
          </div>

          <div className="flex  w-1/5 items-center">
            {productCurrent?.product_quantity < item?.product_quantity ? (
              <Tooltip content={`Số lượng tồn: ${productCurrent.product_quantity}`}>
                <div className="absolute -left-7">
                  <ButtonIcon>
                    <IconError />
                  </ButtonIcon>
                </div>
              </Tooltip>
            ) : null}

            <ButtonIcon
              style={{ position: "unset" }}
              onClick={() => onDecrease(item.product_code, item.product_quantity)}
            >
              <svg className="fill-current text-gray-600 w-3 " viewBox="0 0 448 512">
                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg>
            </ButtonIcon>
            <div className="">
              <input
                onChange={(e) => onChange(item.product_code, Number(e.target.value))}
                className="border text-center"
                type="text"
                defaultValue="0"
                value={item.product_quantity}
              />
            </div>
            <ButtonIcon
              style={{ position: "unset" }}
              className="h-10 w-5"
              onClick={() => onIncrease(item.product_code, item.product_quantity)}
            >
              <svg className="fill-current text-gray-600 w-3 items-center" viewBox="0 0 448 512">
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg>
            </ButtonIcon>
          </div>
          <span className=" w-1/5 font-semibold text-sm">{formatCurrency(item.product_price_sell)}</span>
          <span className=" w-1/6 font-semibold text-sm">
            {formatCurrency(item.product_price_sell * item.product_quantity)}
          </span>
          <ButtonIcon color="white" className="" onClick={() => onClose(item.product_code)}>
            <TrashIcon />
          </ButtonIcon>
        </div>
      </div>

      <MobileWrapper className="w-full z-10  hide-desktop">
        <div className=" items-center">
          <div className="flex justify-between  ">
            <span className="font-bold text-xs mb-2 ">{`${index}, ${item.product_name}`}</span>
            <ButtonIcon color="white" className="mt-2" onClick={() => onClose(item.product_code)}>
              <TrashIcon />
            </ButtonIcon>
          </div>

          <div className="flex ">
            <span className="text-xs mb-0">{` ${item.product_code}`}</span>
          </div>
          <div className="flex justify-between  items-center">
            <Flex>
              <span className="  font-semibold text-sm">{formatCurrency(item.product_price_sell)}</span>
            </Flex>

            <div className="flex  items-center ">
              {productCurrent?.product_quantity < item?.product_quantity ? (
                <Tooltip content={`Số lượng tồn: ${productCurrent.product_quantity}`}>
                  <div className="absolute -left-7">
                    <ButtonIcon>
                      <IconError />
                    </ButtonIcon>
                  </div>
                </Tooltip>
              ) : null}

              <ButtonIcon
                style={{ position: "unset" }}
                onClick={() => onDecrease(item.product_code, item.product_quantity)}
              >
                <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                  <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
              </ButtonIcon>

              <div className="">
                <input
                  onChange={(e) => onChange(item.product_code, Number(e.target.value))}
                  className="mx-1 border text-center "
                  type="text"
                  defaultValue="0"
                  value={item.product_quantity}
                />
              </div>

              <ButtonIcon
                style={{ position: "unset" }}
                onClick={() => onIncrease(item.product_code, item.product_quantity)}
              >
                <svg className="fill-current text-gray-600 w-3 items-center" viewBox="0 0 448 512">
                  <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
              </ButtonIcon>
            </div>
          </div>
        </div>
      </MobileWrapper>
    </CartItemWrapper>
  );
};

export default CartItem;
