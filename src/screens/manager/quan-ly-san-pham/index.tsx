import { DataTable, TableConfig } from "@custom-types/config-table";
import { Card, CardBody } from "@material-tailwind/react";
import Table from "components/table";
import TableMobile from "components/table-mobile";
import { useMemo, useState } from "react";
import { ScrollCustom } from "styles";
import { formatValueTable } from "utils/format-value";

export function ManagerProductScreen() {
  const [multiSelect, setMultiSelect] = useState([]);

  const [listOrderService, setListOrderService] = useState<any[]>([]);

  const tableConfig: TableConfig[] = [
    {
      key: "username",
      label: "Tài khoản",
      type: "string",
      primary: true,
      show: true,
    },
    {
      key: "status",
      label: "Trạng thái",
      type: "string",
      show: true,
    },
    {
      key: "type_service",
      label: "Dịch vụ",
      type: "string",
      show: true,
    },
    {
      key: "link_url",
      label: "Link uuid",
      type: "rich-text",
      show: true,
    },
    {
      key: "content_cmt",
      label: "Nội dung",
      type: "rich-text",
      show: true,
    },
    // {
    //   key: "speed",
    //   label: "Tốc độ",
    //   type: "string",
    //   show: true,
    // },
    {
      key: "quantity",
      label: "Số lượng",
      type: "number",
      show: true,
    },
    {
      key: "total_point",
      label: "Point",
      type: "number",
      show: true,
    },
    {
      key: "note",
      label: "Ghi chú",
      type: "string",
      show: true,
    },
    {
      key: "createdAt",
      label: "Thời gian order",
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

  const listFormatOrderService = useMemo(
    () =>
      listOrderService.map((item) => {
        return {
          id: item._id,
          username: item.user.username,
          status: item.status,
          code_service: item.type_service.code,
          type_service: item.type_service.title,
          link_url: item.link_url,
          content_cmt: item.content_cmt,
          speed: item.speed,
          quantity: item.quantity,
          total_point: item.total_point,
          note: item.note,
          createdAt: item.createdAt,
        };
      }),
    [listOrderService]
  );

  const dataTableFormat: DataTable[][] = useMemo(
    () =>
      listFormatOrderService?.map((d: any) =>
        tableConfig.map((config) => ({
          config: config,
          node: formatValueRequest(d, config),
          originData: {
            multiSelectId: d["id"],
            disabled: d["status"] !== "Pending",
          },
        }))
      ),
    [listFormatOrderService]
  );

  const formatValueRequest = (data: any, config: TableConfig) => {
    switch (config.key) {
      case "button":
        return <></>;
      case "status":
        return <></>;

      default:
        return formatValueTable(data, config);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardBody className="overflow-x-scroll p-24 pt-0 pb-2">
          <ScrollCustom tableScroll>
            <Table
              multiSelect={multiSelect}
              onChangeMultiSelect={setMultiSelect}
              showConfig={false}
              showPagination={true}
              config={tableConfig}
              data={dataTableFormat ?? []}
            />
          </ScrollCustom>
          <TableMobile config={tableConfig} data={dataTableFormat ?? []} />
        </CardBody>
      </Card>
    </div>
  );
}

export default ManagerProductScreen;
