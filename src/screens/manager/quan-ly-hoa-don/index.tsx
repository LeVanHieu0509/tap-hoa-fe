import { TableConfig } from "@custom-types/config-table";
import { GetCartsOutput } from "@custom-types/manager";
import { getAllCarts } from "api/manager";
import { Alert } from "components/alert";
import useActionApi from "hooks/use-action-api";
import { useEffect, useMemo, useState } from "react";
import QuanLyComponent from "../quan-ly-component";
import { QuanLyHoaDonScreenWrapper } from "./styled";

interface QuanLyHoaDonScreenProps {}

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

const QuanLyHoaDonScreen = ({}: QuanLyHoaDonScreenProps) => {
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

  const handleDetailProduct = () => {
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

  return (
    <QuanLyHoaDonScreenWrapper>
      <QuanLyComponent
        type="quan-ly-hoa-don"
        tableConfig={tableConfig}
        listFormat={listFormat}
        detailBtn={{
          onclick: handleDetailProduct,
        }}
        updateBtn={{
          onclick: handleUpdateProduct,
        }}
        deleteBtn={{
          onclick: handleDeleteProduct,
        }}
      />
    </QuanLyHoaDonScreenWrapper>
  );
};

export default QuanLyHoaDonScreen;
