import { TableConfig } from "@custom-types/config-table";
import { GetCartsOutput, GetProductOutput } from "@custom-types/manager";
import { getAllCarts } from "api/manager";
import { Alert } from "components/alert";
import useActionApi from "hooks/use-action-api";
import { useAppSelector } from "hooks/use-redux";
import { get } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { rootAction } from "redux/reducers/root-reducer";
import { formatCurrency } from "utils/format-value";
import QuanLyComponent from "../quan-ly-component";
import { QuanLyHoaDonScreenWrapper } from "./styled";

interface QuanLyHoaDonScreenProps {}

const tableConfig: TableConfig[] = [
  {
    key: "cart_code",
    label: "Mã hoá đơn",
    type: "string",
    primary: true,
    show: true,
  },
  {
    key: "usr_name",
    label: "Người tạo",
    type: "string",
    show: true,
  },
  {
    key: "cart_state",
    label: "Trạng thái hoá đơn",
    type: "string",
    show: true,
  },
  {
    key: "totalMoney",
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
  const dispatch = useDispatch();
  const [lists, setLists] = useState<GetCartsOutput[]>([]);
  const { reLoading, currentUser } = useAppSelector((r) => r.rootReducer);

  const actionGetAllCarts = useActionApi(getAllCarts);

  useEffect(() => {
    if (reLoading || currentUser) {
      actionGetAllCarts(
        {
          limit: "",
          sortOrder: "DESC",
          // sortOrder: "ASC",
          sortBy: "createdAt",
          page: "",
          filter: {
            cart_state: "",
            usr_id: currentUser?.user?.usr_roles == "ADMINIE" ? null : currentUser?.user?.usr_id,
          },
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

  const listFormat = useMemo(
    () =>
      lists?.map((item) => {
        return {
          usr_name: item.user.usr_name,
          cart_code: item.cart_code,
          cart_products: item.cart_products,
          cart_state: item.cart_state == "active" ? "Lưu tạm" : "Đã thanh toán",
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          totalMoney: formatCurrency(
            JSON.parse(item.cart_products).reduce((accumulator: GetProductOutput, currentValue) => {
              let price = currentValue.product_price_sell * currentValue.product_quantity;

              return Number((price as any) + accumulator);
            }, 0)
          ),
        };
      }),
    [lists]
  );

  return (
    <QuanLyHoaDonScreenWrapper>
      <QuanLyComponent
        isSearch
        type="quan-ly-hoa-don"
        tableConfig={tableConfig}
        listFormat={listFormat}
        detailBtn={{
          onclick: handleDetailProduct,
        }}
      />
    </QuanLyHoaDonScreenWrapper>
  );
};

export default QuanLyHoaDonScreen;
