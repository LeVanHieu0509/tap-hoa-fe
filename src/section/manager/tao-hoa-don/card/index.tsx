import { GetProductOutput } from "@custom-types/manager";
import { CardBody, Typography } from "@material-tailwind/react";
import { Flex, FlexColumn } from "styles/common";
import { formatCurrency } from "utils/format-value";
import { CardItemWrapper } from "./styled";

interface CardItemProps {
  item: GetProductOutput;
  onClick: (value: GetProductOutput) => void;
}

const CardItem = ({ item, onClick }: CardItemProps) => {
  return (
    <CardItemWrapper onClick={() => onClick(item)}>
      <div className="p-2 w-full border-b">
        <Flex align="center" className=" hover:color-blue">
          {item.product_image_url ? (
            <img className="rounded ml-1" width={70} src={item.product_image_url} alt="card-image" />
          ) : (
            <img
              className="rounded ml-1"
              width={70}
              src={`${process.env.basePath}/images/no-image.jpeg`}
              alt="image description"
            />
          )}

          <CardBody className="w-full ">
            <Flex justify="space-between" className="w-full">
              <FlexColumn className="w-full">
                <Typography variant="h6" color="blue-gray" className="mb-2 text-left">
                  {item.product_name}
                </Typography>
                <span className="text-left">Mã sản phẩm: {item.product_code}</span>
                <Flex align="center" justify="space-between" className="w-full">
                  <span className="text-left">Hàng tồn: {item.product_quantity}</span>
                  <Typography className="text-right">{formatCurrency(item.product_price_sell)}</Typography>
                </Flex>
              </FlexColumn>
            </Flex>
          </CardBody>
        </Flex>
      </div>
    </CardItemWrapper>
  );
};

export default CardItem;
