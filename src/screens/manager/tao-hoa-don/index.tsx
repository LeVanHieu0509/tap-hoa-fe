import { TableConfig } from "@custom-types/config-table";
import { GetCartsOutput } from "@custom-types/manager";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { getAllCarts } from "api/manager";
import { Alert } from "components/alert";
import DropDown from "components/dropdown-fieldset";
import IconClose from "components/icons/source/close";
import useActionApi from "hooks/use-action-api";
import { useEffect, useMemo, useState } from "react";
import CardItem from "section/manager/tao-hoa-don/card";
import Checkout from "section/manager/tao-hoa-don/checkout";
import ListOrders from "section/manager/tao-hoa-don/orders";
import { useTheme } from "styled-components";
import { Flex } from "styles/common";
import { ContentLeft, ContentOrder, ContentRight, TaoHoaDonScreenWrapper } from "./styled";

interface TaoHoaDonScreenProps {}

const tableConfig: TableConfig[] = [
  {
    key: "id",
    label: "Mã hoá đơn",
    type: "string",
    primary: true,
    show: true,
  },
  {
    key: "cart_state",
    label: "Trạng thái hoá đơn",
    type: "string",
    show: true,
  },
  {
    key: "product_name",
    label: "Tổng tiền",
    type: "string",
    show: true,
  },
  {
    key: "createdAt",
    label: "Ngày tạo hoá đơn",
    type: "date",
    show: true,
  },
  {
    key: "button",
    label: "Chức năng",
    type: "status",
    show: true,
  },
];

const TaoHoaDonScreen = ({}: TaoHoaDonScreenProps) => {
  const [lists, setLists] = useState<GetCartsOutput[]>([]);

  const actionGetAllCarts = useActionApi(getAllCarts);

  useEffect(() => {
    actionGetAllCarts(
      {
        limit: "",
        sortOrder: "",
        sortBy: "",
        page: "",
        filter: {},
        select: null,
      },
      {
        type: "global",
        name: "",
      }
    )
      .then(({ data }) => {
        if (data.status == "1") {
          setLists(data.data.products);
        } else {
          Alert("ERROR", data.message);
        }
      })
      .catch((e) => Alert("ERROR", e.message));
  }, []);

  const handleAddProduct = () => {
    console.log("add product");
  };

  const handleUpdateProduct = () => {
    console.log("fix product");
  };

  const handleDeleteProduct = () => {
    console.log("delete product");
  };

  const listFormat = useMemo(
    () =>
      lists?.map((item) => {
        return {
          id: item.id,
          cart_products: item.cart_products,
          cart_state: item.cart_state,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      }),
    [lists]
  );
  const data = [
    {
      label: "Hoá đơn 1",
      value: "hoa-don-1",
    },
    {
      label: "Hoá đơn 2",
      value: "hoa-don-2",
    },
  ];

  const [carts, setCarts] = useState(data);
  const [searchText, setSearchText] = useState("");

  const [currentOrder, setCurrentOrder] = useState("");

  const theme = useTheme();

  const handleAddCart = (lengthCart) => {
    setCarts((pre) => [
      ...pre,
      {
        label: `Hoá đơn ${lengthCart + 1}`,
        value: `hoa-don-${lengthCart + 1}`,
      },
    ]);
  };

  const handleCancelCart = () => {};

  const dropDownList = [
    {
      label: "Phòng Thẩm Định",
      value: "1",
    },
    {
      label: "Phòng Quản Lý Đại Lý và Hỗ Trợ Kinh Doanh",
      value: "2",
    },
    {
      label: "Phòng Chăm Sóc Khách Hàng",
      value: "3",
    },
    {
      label: "Phòng Giải Quyết Quyền Lợi BH",
      value: "4",
    },
    {
      label: "Phòng Quản Lý Sản Phẩm",
      value: "5",
    },
    {
      label: "Phòng Tuân Thủ Nội Bộ",
      value: "6",
    },
    {
      label: "Phòng Công Nghệ Thông tin",
      value: "7",
    },
    {
      label: "Video",
      value: "8",
    },
  ];
  const [valueList, setValueList] = useState(dropDownList[0]);

  return (
    <TaoHoaDonScreenWrapper>
      <Flex justify="space-between" style={{ position: "sticky", top: 100 }}>
        <Flex className="" style={{ width: 400 }}>
          <DropDown
            isChildren
            // title="Tìm kiếm sản phẩm"
            list={[{ value: "ite", label: "123" }]}
            loading={false}
            value={"null"}
            onChange={(e, o) => {}}
            isSearch
          >
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
          </DropDown>
        </Flex>

        <Flex gap={16} gapMb={8} align="center" justify="flex-end">
          <ButtonGroup size="sm" className="flex w-max flex-row gap-4 " color="teal">
            {carts.map((item) => (
              <Button
                style={{ background: item.value == currentOrder && "#e87722" }}
                onClick={() => setCurrentOrder(item.value)}
                key={item.value}
                className="flex items-center gap-3 "
              >
                <span className="mr-2">{item.label}</span>
                <span onClick={handleCancelCart}>
                  <IconClose color="white" />
                </span>
              </Button>
            ))}
          </ButtonGroup>

          <Button color="green" onClick={() => handleAddCart(carts.length)}>
            <PlusIcon height={17} width={17} />
          </Button>
        </Flex>
      </Flex>

      <ContentOrder className="mt-24">
        <ContentLeft>
          <ListOrders />
        </ContentLeft>
        <ContentRight>
          <Checkout />
        </ContentRight>
      </ContentOrder>
    </TaoHoaDonScreenWrapper>
  );
};

export default TaoHoaDonScreen;
