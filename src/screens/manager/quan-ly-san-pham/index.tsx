import { TableConfig } from "@custom-types/config-table";
import { GetProductOutput } from "@custom-types/manager";
import { getProducts } from "api/manager";
import { Alert } from "components/alert";
import useActionApi from "hooks/use-action-api";
import { useEffect, useMemo, useState } from "react";
import QuanLyComponent from "../quan-ly-component";
import { QuanLySanPhamScreenWrapper } from "./styled";
import { useAppSelector } from "hooks/use-redux";
import { rootAction } from "redux/reducers/root-reducer";
import { useDispatch } from "react-redux";
import { get } from "lodash";

interface QuanLySanPhamScreenProps {}

const tableConfig: TableConfig[] = [
  {
    key: "product_code",
    label: "Mã code",
    type: "string",
    primary: true,
    show: true,
  },
  {
    key: "product_bar_code",
    label: "Mã vạch",
    type: "string",
    show: true,
  },
  {
    key: "product_name",
    label: "Tên sản phẩm",
    type: "string",
    show: true,
  },
  {
    key: "product_description",
    label: "Mô tả",
    type: "string",
    show: true,
  },
  {
    key: "product_price_origin",
    label: "Giá vốn",
    type: "number",
    show: true,
  },
  {
    key: "product_price_sell",
    label: "Giá bán",
    type: "number",
    show: true,
  },
  {
    key: "product_quantity",
    label: "Số lượng tồn",
    type: "number",
    show: true,
  },
  {
    key: "product_manufacture_date",
    label: "Ngày sản xuất",
    type: "date",
    show: true,
  },
  {
    key: "product_expired_date",
    label: "Ngày hết hạn",
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

const QuanLySanPhamScreen = ({}: QuanLySanPhamScreenProps) => {
  const dispatch = useDispatch();
  const [lists, setLists] = useState<GetProductOutput[]>();
  const { reLoading, currentUser } = useAppSelector((r) => r.rootReducer);

  const actionGetProducts = useActionApi(getProducts);

  useEffect(() => {
    if (currentUser || reLoading) {
      actionGetProducts(
        {
          limit: "",
          sortOrder: "",
          sortBy: "",
          page: "",
          filter: {},
          select: null,
          priceMin: null,
          priceMax: null,
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
  }, [currentUser, reLoading]);

  const listFormat = useMemo(
    () =>
      lists?.map((item) => {
        return {
          product_code: item.product_code,
          product_bar_code: item.product_bar_code,
          product_name: item.product_name,
          product_description: item.product_description,
          product_price_origin: item.product_price_origin,
          product_price_sell: item.product_price_sell,
          product_quantity: item.product_quantity,
          product_manufacture_date: item.product_manufacture_date,
          product_expired_date: item.product_expired_date,
        };
      }),
    [lists]
  );

  return (
    <QuanLySanPhamScreenWrapper>
      <QuanLyComponent
        type="quan-ly-san-pham"
        addBtn
        updateBtn
        deleteBtn
        tableConfig={tableConfig}
        listFormat={listFormat}
      />
    </QuanLySanPhamScreenWrapper>
  );
};

export default QuanLySanPhamScreen;
