import { CardBody, Typography } from "@material-tailwind/react";
import { Flex, FlexColumn } from "styles/common";
import { CardItemWrapper } from "./styled";

interface CardItemProps {}

const CardItem = ({}: CardItemProps) => {
  return (
    <CardItemWrapper>
      <div className="p-2 w-full mb-8">
        <Flex align="center" className=" hover:color-blue">
          <img
            className="rounded ml-1"
            width={70}
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            alt="card-image"
          />

          <CardBody className="w-full">
            <Flex justify="space-between">
              <FlexColumn>
                <Typography variant="h6" color="blue-gray" className="mb-2 text-left">
                  Tên sản phẩm Tên sản phẩm Tên sản phẩm
                </Typography>
                <span className="text-left">Mã sản phẩm: HX123123</span>
                <span className="text-left">Hàng tồn: 12</span>
              </FlexColumn>

              <Typography className="text-right">28.000</Typography>
            </Flex>
          </CardBody>
        </Flex>
      </div>
    </CardItemWrapper>
  );
};

export default CardItem;
