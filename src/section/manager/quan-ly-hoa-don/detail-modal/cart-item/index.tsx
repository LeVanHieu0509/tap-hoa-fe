import { CardBody, CardFooter, Typography } from "@material-tailwind/react";
import React from "react";
import { Card } from "styles/common";
import { formatCurrency } from "utils/format-value";

interface CartItemOrderProps {
  data: any;
  index: number;
}

const CartItemOrder = ({ index, data }: CartItemOrderProps) => {
  return (
    <CardBody>
      <Typography variant="h6" color="blue-gray" className="mb-1">
        {index}, {data.product_name}
      </Typography>
      <Typography>
        Giá tiền: {data.product_quantity} x {formatCurrency(data.product_price_sell)}
      </Typography>
    </CardBody>
  );
};

export default CartItemOrder;
