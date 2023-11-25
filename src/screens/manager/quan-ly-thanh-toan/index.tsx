import { TableConfig } from "@custom-types/config-table";
import { BillData } from "@custom-types/manager";
import { getBills } from "api/manager";
import { Alert } from "components/alert";
import useActionApi from "hooks/use-action-api";
import { useEffect, useMemo, useState } from "react";
import QuanLyComponent from "../quan-ly-component";
import { QuanLyThanhToanScreenWrapper } from "./styled";
import { get } from "lodash";
import { useAppSelector } from "hooks/use-redux";
import { useDispatch } from "react-redux";
import { rootAction } from "redux/reducers/root-reducer";

interface QuanLyThanhToanScreenProps {}

const tableConfig: TableConfig[] = [
  {
    key: "bills_code",
    label: "Mã thanh toán",
    type: "string",
    primary: true,
    show: true,
  },
  {
    key: "cart_code",
    label: "Mã hoá đơn",
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
    key: "createdAt",
    label: "Ngày thanh toán",
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

const QuanLyThanhToanScreen = ({}: QuanLyThanhToanScreenProps) => {
  const dispatch = useDispatch();
  const [lists, setLists] = useState<BillData[]>([]);

  const { reLoading, currentUser } = useAppSelector((r) => r.rootReducer);

  const actionGetBills = useActionApi(getBills);
  const listFormat = useMemo(
    () =>
      lists.map((item) => {
        return {
          bills_code: item.bills_code,
          cart_code: item.cart.cart_code,
          total_price: item.total_price,
          status: item.status,
          createdAt: item.createdAt,
        };
      }),
    [lists]
  );

  useEffect(() => {
    if (reLoading || currentUser) {
      actionGetBills(
        {
          limit: "",
          sortOrder: "DESC",
          // sortOrder: "ASC",
          sortBy: "createdAt",
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
            dispatch(rootAction.setReloading(false));
          } else {
            Alert("ERROR", data.message);
          }
        })
        .catch((e) => console.log(get(e, "response.data.message")));
    }
  }, [reLoading, currentUser]);

  const handleDetailProduct = () => {
    console.log("add product");
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
