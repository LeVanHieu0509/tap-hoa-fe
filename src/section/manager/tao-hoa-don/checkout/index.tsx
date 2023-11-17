import React from "react";
import { CheckoutWrapper } from "./styles";

interface CheckoutProps {
  data?: any;
}

const Checkout = ({ data }: CheckoutProps) => {
  return (
    <CheckoutWrapper>
      <div id="summary" className="w-1/4 px-8 py-10 w-full">
        <h1 className="font-semibold text-2xl border-b pb-8">Tổng hoá đơn</h1>

        <div className=" mt-8">
          <div className="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Tổng đơn hàng</span>
            <span>$600</span>
          </div>
          <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
            Đặt hàng
          </button>
        </div>
      </div>
    </CheckoutWrapper>
  );
};

export default Checkout;
