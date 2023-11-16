import { TableConfig } from "@custom-types/config-table";
import { GetCartsOutput } from "@custom-types/manager";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import { getAllCarts } from "api/manager";
import { Alert } from "components/alert";
import useActionApi from "hooks/use-action-api";
import { useEffect, useMemo, useState } from "react";
import TabsOrder from "section/manager/tao-hoa-don/table";
import { useTheme } from "styled-components";
import { Flex } from "styles/common";
import { TaoHoaDonScreenWrapper } from "./styled";

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
    {
      label: "Hoá đơn 3",
      value: "hoa-don-3",
    },
    {
      label: "Hoá đơn 4",
      value: "hoa-don-4",
    },
  ];

  const [currentOrder, setCurrentOrder] = useState("");
  const theme = useTheme();

  return (
    <TaoHoaDonScreenWrapper>
      <Flex align="center" justify="flex-end" className="mb-24">
        <Button
          disabled={false}
          onClick={() => {}}
          size={"sm"}
          color="green"
          style={{
            color: "#ffffff",
            background: theme.color.status.blue,
          }}
        >
          <Flex align="center" gap={4}>
            <PlusIcon style={{ color: "#ffffff" }} height={24} /> Thêm hoá đơn
          </Flex>
        </Button>
      </Flex>

      <TabsOrder data={data} setCurrentOrder={setCurrentOrder} />

      {/* <QuanLyComponent
        onAdd={handleAddProduct}
        onUpdate={handleUpdateProduct}
        onDelete={handleDeleteProduct}
        tableConfig={tableConfig}
        listFormat={listFormat}
      /> */}
    </TaoHoaDonScreenWrapper>
  );
};

export default TaoHoaDonScreen;
