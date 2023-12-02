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
                <Flex justify="space-between" className="w-full">
                  <div>
                    <h6 className="bold text-left">{item.product_name}</h6>
                    <span>Mã sản phẩm: {item.product_code}</span>
                    <span>Mã vạch: {item.product_bar_code}</span>
                  </div>
                </Flex>

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
            <FlexColumn className="w-full" justify="flex-start">
              <Flex justify="space-between" className="w-full">
                <div>
                  <h6 className="bold text-left">{item.product_name}</h6>
                  <span>Mã sản phẩm: {item.product_code}</span>
                  <span>Mã vạch: {item.product_bar_code}</span>
                </div>
              </Flex>

              <Flex justify="space-between" className="w-full h-5">
                <p className="text-left">Hàng tồn: {item.product_quantity}</p>
                <Typography variant="small" className="text-right">
                  {formatCurrency(item.product_price_sell)}
                </Typography>
              </Flex>
            </FlexColumn>
          </CardBody>
        </Flex>
      </MobileWrapper>
    </CardItemWrapper>
  );
};

export default CardItem;
