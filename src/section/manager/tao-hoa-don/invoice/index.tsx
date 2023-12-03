import { CheckoutReviewOutput } from "@custom-types/manager";
import { checkoutReview } from "api/manager";
import { Alert } from "components/alert";
import LoadingSection from "components/loading";
import useActionApi from "hooks/use-action-api";
import { useAppSelector } from "hooks/use-redux";
import { useEffect, useState } from "react";
import { formatNumberTwoString, getDateTo } from "utils";
import { formatCurrency } from "utils/format-value";
import { InvoiceWrapper, MobileWrapper } from "./styles";
import { get } from "lodash";
import { CardBody, Typography } from "@material-tailwind/react";
import { Flex, FlexColumn } from "styles/common";

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
      actionCheckoutReview(data, {
        type: "local",
        name: "loadingActionCheckoutReview",
      })
        .then(({ data }) => {
          if (data.status == "1") {
            setDataCheckout(data.data);
          } else {
            Alert("ERROR", data.message);
          }
        })
        .catch((e) => console.log(get(e, "response.data.message")));
    }
  }, []);

  return (
    <InvoiceWrapper>
      {loadingActionCheckoutReview ? (
        <LoadingSection />
      ) : (
        <div className="bg-white   mx-auto">
          <div className="hide-mobile rounded-lg shadow-lg px-4 py-2">
            <div className="flex items-center justify-between mb-8">
              <div className="text-gray-700"></div>
            </div>

            <table className="w-full text-left mb-8">
              <thead>
                <tr>
                  <th className="text-gray-700 uppercase">Tên sản phẩm</th>
                  <th className="text-gray-700 uppercase">Số lượng</th>
                  <th className="text-gray-700 uppercase">Giá</th>
                  <th className="text-gray-700 uppercase">Tổng</th>
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

            <Flex justify="flex-end" align="center" className="mb-8">
              <div className="text-gray-700 mr-2">Tổng:</div>
              <div className="text-gray-700 font-bold text-xl">
                {dataCheckout ? formatCurrency(dataCheckout?.totalPrice) : 0}
              </div>
            </Flex>

            <div className="border-t-2 border-gray-300 pt-8 mb-8">
              <div className="text-gray-700 mb-2 text-center">
                Cảm ơn quý khách đã mua sản phẩm, nếu có vấn đề gì về hoá đơn vui lòng liên hệ{" "}
                <strong>TAP HOA JUN BF</strong> để được xử lý!
              </div>
            </div>
          </div>

          <MobileWrapper className="hide-desktop w-full">
            <FlexColumn gap={8} gapMb={8}>
              {dataCheckout &&
                dataCheckout.cartProducts.map((item, index) => (
                  <>
                    <CardBody key={item.product_code} className="border-b-2 w-full">
                      <Typography variant="h6" color="blue-gray" className="">
                        {index + 1}, {item.product_name}
                      </Typography>
                      <Flex justify="space-between">
                        <div>
                          <h3>{formatCurrency(item.product_total_price)}</h3>
                          <h6 className="text-gray-400">{formatCurrency(item.product_price_sell)}</h6>
                        </div>
                        <h6>
                          Số lượng: <span className="bold">{formatNumberTwoString(item.product_quantity_order)}</span>
                        </h6>
                      </Flex>
                    </CardBody>
                  </>
                ))}
            </FlexColumn>
            <div className="flex justify-end items-center mb-8 mt-8" style={{ height: 30 }}>
              <div className="text-gray-700 mr-2 mt-2">Tổng tiền:</div>
              <div className="text-gray-700 font-bold text-xl">
                {dataCheckout ? formatCurrency(dataCheckout?.totalPrice) : 0}
              </div>
            </div>
          </MobileWrapper>
        </div>
      )}
    </InvoiceWrapper>
  );
};

export default Invoice;
