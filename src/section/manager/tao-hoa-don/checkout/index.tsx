import { Button } from "@material-tailwind/react";
import LoadingSection from "components/loading";
import { useAppSelector } from "hooks/use-redux";
import { sum } from "lodash";
import { useMemo } from "react";
import { useTheme } from "styled-components";
import { formatCurrency } from "utils/format-value";
import { CheckoutWrapper, TotalWrapper } from "./styles";

interface CheckoutProps {
  lists?: any;
  onReview: () => void;
}

const Checkout = ({ lists, onReview }: CheckoutProps) => {
  const theme = useTheme();
  const {
    loading: { loadingActionUpdateCarts },
  } = useAppSelector((r) => r.rootReducer);

  const listPrice = useMemo(() => {
    return lists?.map((item) => {
      const price = item.product_price_sell * item.product_quantity;

      return price;
    });
  }, [lists]);

  return (
    <CheckoutWrapper>
      <div id="summary" className="w-1/4 px-8 py-10 w-full">
        <h1 className="hide-mobile font-semibold text-2xl border-b pb-8">Hoá đơn</h1>

        <div className=" mt-8">
          <TotalWrapper className="flex font-semibold justify-between py-6 text-sm uppercase">
            <h3 className="bold hide-mobile">Tổng Tiền</h3>
            <h6 className="bold hide-desktop">
              Tổng Tiền <span className="hide-desktop"> ({lists.length})</span>:
            </h6>
            <h3 className="bold">{formatCurrency(sum(listPrice))}</h3>
          </TotalWrapper>

          <Button
            disabled={sum(listPrice) <= 0 && true}
            onClick={onReview}
            variant="filled"
            fullWidth
            className="text-sm text-white uppercase primary-color"
          >
            {loadingActionUpdateCarts ? <LoadingSection loading={true} /> : "Đặt hàng"}
          </Button>
        </div>
      </div>
    </CheckoutWrapper>
  );
};

export default Checkout;
