import { CardBody, Typography } from "@material-tailwind/react";
import { Flex, FlexColumn } from "styles/common";
import { CardItemWrapper } from "./styled";
import { GetProductOutput } from "@custom-types/manager";
import { formatCurrency } from "utils/format-value";

interface CardItemProps {
  item: GetProductOutput;
  onClick: (value: GetProductOutput) => void;
}

const CardItem = ({ item, onClick }: CardItemProps) => {
  return (
    <CardItemWrapper onClick={() => onClick(item)}>
      <div className="p-2 w-full mb-8">
        <Flex align="center" className=" hover:color-blue">
          <img className="rounded ml-1" width={70} src={item.product_image_url} alt="card-image" />

          <CardBody className="w-full">
            <Flex justify="space-between">
              <FlexColumn>
                <Typography variant="h6" color="blue-gray" className="mb-2 text-left">
                  {item.product_name}
                </Typography>
                <span className="text-left">Mã sản phẩm: {item.product_code}</span>
                <span className="text-left">Hàng tồn: {item.product_quantity}</span>
              </FlexColumn>

              <Typography className="text-right">{formatCurrency(item.product_price_sell)}</Typography>
            </Flex>
          </CardBody>
        </Flex>
      </div>
    </CardItemWrapper>
  );
};

export default CardItem;
