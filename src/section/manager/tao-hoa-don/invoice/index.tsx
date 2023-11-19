import { CheckoutReviewOutput } from "@custom-types/manager";
import { checkoutReview } from "api/manager";
import { Alert } from "components/alert";
import LoadingSection from "components/loading";
import useActionApi from "hooks/use-action-api";
import { useAppSelector } from "hooks/use-redux";
import { useEffect, useState } from "react";
import { formatNumberTwoString, getDateTo } from "utils";
import { formatCurrency } from "utils/format-value";
import { InvoiceWrapper } from "./styles";

interface InvoiceProps {
  data?: any;
}

const Invoice = ({ data }: InvoiceProps) => {
  const {
    currentUser,
    loading: { loadingActionCheckoutReview },
  } = useAppSelector((r) => r.rootReducer);

  const [dataCheckout, setDataCheckout] = useState<CheckoutReviewOutput>();
  const actionCheckoutReview = useActionApi(checkoutReview);

  useEffect(() => {
    if (currentUser && data) {
      actionCheckoutReview(
        {
          id: data,
        },
        {
          type: "local",
          name: "loadingActionCheckoutReview",
        }
      )
        .then(({ data }) => {
          if (data.status == "1") {
            setDataCheckout(data.data);
          } else {
            Alert("ERROR", data.message);
          }
        })
        .catch((e) => e);
    }
  }, [data]);

  return (
    <InvoiceWrapper>
      {loadingActionCheckoutReview ? (
        <LoadingSection />
      ) : (
        <div className="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <img
                className="h-8 w-8 mr-2"
                src="https://tailwindflex.com/public/images/logos/favicon-32x32.png"
                alt="Logo"
              />
              <div className="text-gray-700 font-semibold text-lg">TAP HOA JUN BF</div>
            </div>
            <div className="text-gray-700">
              <div className="text-sm">Date: {getDateTo()}</div>
              <div className="text-sm">Invoice: {data}</div>
            </div>
          </div>

          <table className="w-full text-left mb-8">
            <thead>
              <tr>
                <th className="text-gray-700 font-bold uppercase py-2">Tên sản phẩm</th>
                <th className="text-gray-700 font-bold uppercase py-2">Số lượng</th>
                <th className="text-gray-700 font-bold uppercase py-2">Giá</th>
                <th className="text-gray-700 font-bold uppercase py-2">Tổng</th>
              </tr>
            </thead>
            <tbody>
              {dataCheckout &&
                dataCheckout.cartProducts.map((item, index) => (
                  <tr key={item.product_code}>
                    <td className="py-4 text-gray-700 w-1/2">
                      {index + 1}, {item.product_name}
                    </td>
                    <td className="py-4 text-gray-700 w-1/4 text-center">
                      {formatNumberTwoString(item.product_quantity_order)}
                    </td>
                    <td className="py-4 text-gray-700 w-1/4">{formatCurrency(item.product_price_sell)}</td>
                    <td className="py-4 text-gray-700 w-1/4">{formatCurrency(item.product_total_price)}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="flex justify-end mb-8" style={{ height: 30 }}>
            <div className="text-gray-700 mr-2">Total:</div>
            <div className="text-gray-700 font-bold text-xl">
              {dataCheckout ? formatCurrency(dataCheckout?.totalPrice) : 0}
            </div>
          </div>

          <div className="border-t-2 border-gray-300 pt-8 mb-8">
            <div className="text-gray-700 mb-2 text-center">
              Cảm ơn quý khách đã mua sản phẩm, nếu có vấn đề gì về hoá đơn vui lòng liên hệ{" "}
              <strong>TAP HOA JUN BF</strong> để được xử lý!
            </div>
          </div>
        </div>
      )}
    </InvoiceWrapper>
  );
};

export default Invoice;
