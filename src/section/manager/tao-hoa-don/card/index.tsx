import { GetProductOutput } from "@custom-types/manager";
import { CardBody, Typography } from "@material-tailwind/react";
import { Flex, FlexColumn } from "styles/common";
import { formatCurrency } from "utils/format-value";
import { CardItemWrapper, MobileWrapper } from "./styled";

interface CardItemProps {
  item: GetProductOutput;
  onClick: (value: GetProductOutput) => void;
}

const CardItem = ({ item, onClick }: CardItemProps) => {
  return (
    <CardItemWrapper onClick={() => onClick(item)}>
      <div className="p-2 w-full border-b hide-mobile">
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
                <span className="text-left">Mã vạch: {item.product_bar_code}</span>
                <Flex align="center" justify="space-between" className="w-full">
                  <span className="text-left">Hàng tồn: {item.product_quantity}</span>
                  <Typography className="text-right">{formatCurrency(item.product_price_sell)}</Typography>
                </Flex>
              </FlexColumn>
            </Flex>
          </CardBody>
        </Flex>
      </div>

      <MobileWrapper className="p-2 w-full border-b hide-desktop">
        <Flex align="center" className=" hover:color-blue">
          {item.product_image_url ? (
            <img className="rounded" width={40} src={item.product_image_url} alt="card-image" />
          ) : (
            <img
              className="rounded"
              width={40}
              src={`${process.env.basePath}/images/no-image.jpeg`}
              alt="image description"
            />
          )}

          <CardBody className="w-full ">
            <Flex justify="space-between" className="w-full">
              <FlexColumn className="w-full">
                <Typography variant="h6" color="blue-gray" className="text-left">
                  {item.product_name}
                </Typography>
                <FlexColumn>
                  <span className="text-left">Mã sản phẩm: {item.product_code}</span>
                  <span className="text-left">Mã vạch: {item.product_bar_code}</span>
                </FlexColumn>

                <Flex justify="space-between" className="w-full h-5">
                  <p className="text-left">Hàng tồn: {item.product_quantity}</p>
                  <Typography variant="small" className="text-right">
                    {formatCurrency(item.product_price_sell)}
                  </Typography>
                </Flex>
              </FlexColumn>
            </Flex>
          </CardBody>
        </Flex>
      </MobileWrapper>
    </CardItemWrapper>
  );
};

export default CardItem;
