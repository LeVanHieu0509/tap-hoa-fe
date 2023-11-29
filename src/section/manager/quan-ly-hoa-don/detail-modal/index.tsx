import React from "react";
import { DetailModalWrapper } from "./styles";
import CartItem from "section/manager/tao-hoa-don/orders/cart-item";
import CartItemOrder from "./cart-item";
import { Card } from "styles/common";

interface DetailModalProps {
  data: any;
}

const DetailModal = ({ data }: DetailModalProps) => {
  const cartsProduct = JSON.parse(data.cart_products);
  return (
    <DetailModalWrapper>
      <Card className="rounded-none mt-6 w-full p-10 rounded-lg">
        {cartsProduct.length > 0 ? (
          cartsProduct.map((item, index) => <CartItemOrder index={index + 1} key={item.product_code} data={item} />)
        ) : (
          <p className="text-center mt-20">Không có sản phẩm nào được thêm vào!</p>
        )}
      </Card>
    </DetailModalWrapper>
  );
};

export default DetailModal;
