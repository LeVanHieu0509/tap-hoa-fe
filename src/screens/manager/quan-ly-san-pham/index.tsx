import { DataTable, TableConfig } from "@custom-types/config-table";
import { Card, CardBody } from "@material-tailwind/react";
import Table from "components/table";
import TableMobile from "components/table-mobile";
import { useEffect, useMemo, useState } from "react";
import { ActionsWrapper, ScrollCustom } from "styles";
import { formatValueTable } from "utils/format-value";
import Actions from "../components/actions";
import ModalCustom from "components/modal-custom";

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
    type: "rich-text",
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

export function ManagerProductScreen() {
  const [showModal, setShowModal] = useState({
    show: false,
    data: "",
  });

  const [lists, setLists] = useState<any[]>([]);
  const [multiSelect, setMultiSelect] = useState([]);
  const isSelectAll = false;
  const isShowModal = false;

  const listFormat = useMemo(
    () =>
      lists.map((item) => {
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

  useEffect(() => {
    setLists([
      {
        product_code: "123",
        product_bar_code: "123",
        product_name: "123",
        product_description: "123",
        product_price_origin: "123",
        product_price_sell: "123",
        product_quantity: "123",
        product_manufacture_date: "123",
        product_expired_date: "123",
      },
      {
        product_code: "123",
        product_bar_code: "123",
        product_name: "123",
        product_description: "123",
        product_price_origin: "123",
        product_price_sell: "123",
        product_quantity: "123",
        product_manufacture_date: "123",
        product_expired_date: "123",
      },
      {
        product_code: "123",
        product_bar_code: "123",
        product_name: "123",
        product_description: "123",
        product_price_origin: "123",
        product_price_sell: "123",
        product_quantity: "123",
        product_manufacture_date: "123",
        product_expired_date: "123",
      },
      {
        product_code: "123",
        product_bar_code: "123",
        product_name: "123",
        product_description: "123",
        product_price_origin: "123",
        product_price_sell: "123",
        product_quantity: "123",
        product_manufacture_date: "123",
        product_expired_date: "123",
      },
      {
        product_code: "123",
        product_bar_code: "123",
        product_name: "123",
        product_description: "123",
        product_price_origin: "123",
        product_price_sell: "123",
        product_quantity: "123",
        product_manufacture_date: "123",
        product_expired_date: "123",
      },
      {
        product_code: "123",
        product_bar_code: "123",
        product_name: "123",
        product_description: "123",
        product_price_origin: "123",
        product_price_sell: "123",
        product_quantity: "123",
        product_manufacture_date: "123",
        product_expired_date: "123",
      },
    ]);
  }, []);

  const formatValueRequest = (data: any, config: TableConfig) => {
    switch (config.key) {
      case "button":
        return (
          <Actions
            data={data}
            successBtn={{
              text: "Sửa",
              onClick: () => {},
            }}
            errorBtn={{
              text: "Xoá",
              onClick: () => {},
            }}
          />
        );

      default:
        return formatValueTable(data, config);
    }
  };

  const dataTableFormat: DataTable[][] = useMemo(
    () =>
      listFormat?.map((d: any) =>
        tableConfig.map((config) => ({
          config: config,
          node: formatValueRequest(d, config),
          originData: {
            multiSelectId: d["id"],
          },
        }))
      ),
    [listFormat]
  );

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardBody className="overflow-x-scroll p-24 pt-0 pb-2">
          <ActionsWrapper justify={isSelectAll ? "space-between" : null}>
            {isSelectAll && (
              <Actions
                data={dataTableFormat}
                successBtn={{
                  disabled: multiSelect.length == 0 || multiSelect.every((i) => i.disabled == true),
                  text: "Xoá tất cả ✅",
                  onClick: () => {},
                }}
              />
            )}

            <Actions
              data={dataTableFormat}
              successBtn={{
                text: "Thêm sản phẩm ✅",
                onClick: () => {},
              }}
              customBtn={{
                text: "Giảm dần 🔄",
                onClick: () => {},
              }}
              refreshBtn={{
                text: "Làm mới 🔄",
                onClick: () => {},
              }}
            />
          </ActionsWrapper>

          <ScrollCustom tableScroll className="ok">
            <Table
              multiSelect={isSelectAll && multiSelect}
              onChangeMultiSelect={isSelectAll ? setMultiSelect : null}
              showConfig={false}
              showPagination={true}
              config={tableConfig}
              data={dataTableFormat ?? []}
            />
          </ScrollCustom>
          <TableMobile config={tableConfig} data={dataTableFormat ?? []} />
        </CardBody>
      </Card>

      {isShowModal && (
        <ModalCustom
          show={showModal.show}
          onCloseModal={() => {
            setShowModal({
              show: false,
              data: "",
            });
          }}
          title="Xác nhận đơn hàng"
          primaryBtn={{
            text: "Xác nhận",
            onClick: () => {},
          }}
          secondaryBtn={{
            text: "Huỷ bỏ",
            onClick: () => {},
          }}
        >
          123
        </ModalCustom>
      )}
    </div>
  );
}

export default ManagerProductScreen;
