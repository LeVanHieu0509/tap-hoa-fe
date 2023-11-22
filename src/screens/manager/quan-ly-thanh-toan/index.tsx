import { TableConfig } from "@custom-types/config-table";
import { BillData } from "@custom-types/manager";
import { getBills } from "api/manager";
import { Alert } from "components/alert";
import useActionApi from "hooks/use-action-api";
import { useEffect, useMemo, useState } from "react";
import QuanLyComponent from "../quan-ly-component";
import { QuanLyThanhToanScreenWrapper } from "./styled";
import { get } from "lodash";

interface QuanLyThanhToanScreenProps {}

const tableConfig: TableConfig[] = [
  {
    key: "id",
    label: "Mã thanh toán",
    type: "string",
    primary: true,
    show: true,
  },
  {
    key: "total_price",
    label: "Tổng tiền",
    type: "number",
    show: true,
  },
  {
    key: "status",
    label: "Trạng thái",
    type: "string",
    show: true,
  },
  {
    key: "button",
    label: "Chức năng",
    type: "status",
    show: true,
  },
];

const QuanLyThanhToanScreen = ({}: QuanLyThanhToanScreenProps) => {
  const [lists, setLists] = useState<BillData[]>([]);

  const actionGetBills = useActionApi(getBills);
  const listFormat = useMemo(
    () =>
      lists.map((item) => {
        return {
          id: item.id,
          product_code: item.id,
          total_price: item.total_price,
          status: item.status,
          createdAt: item.createdAt,
        };
      }),
    [lists]
  );

  useEffect(() => {
    actionGetBills(
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
      .catch((e) => console.log(get(e, "response.data.message")));
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

  return (
    <QuanLyThanhToanScreenWrapper>
      <QuanLyComponent
        type="quan-ly-thanh-toan"
        detailBtn={{
          onclick: handleDetailProduct,
        }}
        // updateBtn={{
        //   onclick: handleUpdateProduct,
        // }}
        // deleteBtn={{
        //   onclick: handleDeleteProduct,
        // }}
        tableConfig={tableConfig}
        listFormat={listFormat}
      />
    </QuanLyThanhToanScreenWrapper>
  );
};

export default QuanLyThanhToanScreen;
