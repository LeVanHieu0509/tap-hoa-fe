import { DataTable, TableConfig } from "@custom-types/config-table";
import { ShowModal } from "@custom-types/manager";
import { Card, CardBody } from "@material-tailwind/react";
import ModalCustom from "components/modal-custom";
import Table from "components/table";
import TableMobile from "components/table-mobile";
import { useMemo, useState } from "react";
import AddModal from "section/manager/product/add-modal";
import DeleteModal from "section/manager/product/delete-modal";
import FixModal from "section/manager/product/fix-modal";
import { ActionsWrapper, ScrollCustom } from "styles";
import { formatValueTable } from "utils/format-value";
import Actions from "../components/actions";

interface QuanLyComponent {
  isSelectAll?: boolean;
  tableConfig: TableConfig[];
  listFormat: any;
  onAdd: () => void;
  onUpdate: () => void;
  onDelete: () => void;
}
export function QuanLyComponent({
  isSelectAll = false,
  tableConfig,
  listFormat,
  onAdd,
  onUpdate,
  onDelete,
}: QuanLyComponent) {
  const [multiSelect, setMultiSelect] = useState([]);
  const [showModal, setShowModal] = useState<ShowModal>({
    type: null,
    show: false,
    data: null,
    title: "",
  });

  const formatValueRequest = (data: any, config: TableConfig) => {
    switch (config.key) {
      case "button":
        return (
          <Actions
            data={data}
            successBtn={{
              text: "Sửa",
              onClick: () =>
                setShowModal({
                  type: "fix",
                  show: true,
                  data: data,
                  title: "Sửa sản phẩm",
                  onConfirm: onUpdate,
                }),
            }}
            errorBtn={{
              text: "Xoá",
              onClick: () =>
                setShowModal({
                  type: "fix",
                  show: true,
                  data: data,
                  title: "Bạn có chắc chắn xoá sản phẩm?",
                  onConfirm: onDelete,
                }),
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

  const ModalContent = useMemo(() => {
    switch (showModal.type) {
      case "add":
        return AddModal;
      case "fix":
        return FixModal;
      case "delete":
        return DeleteModal;
    }
  }, [showModal]);

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
                onClick: () =>
                  setShowModal({
                    type: "add",
                    show: true,
                    data: null,
                    title: "Thêm sản phẩm",
                    onConfirm: onAdd,
                  }),
              }}
              refreshBtn={{
                text: "Làm mới 🔄",
                onClick: () => {},
              }}
            />
          </ActionsWrapper>

          <ScrollCustom tableScroll className="">
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

      {showModal.show && (
        <ModalCustom
          show={showModal.show}
          onCloseModal={() => {
            setShowModal({
              show: false,
            });
          }}
          title={showModal.title}
          primaryBtn={{
            text: "Xác nhận",
            onClick: showModal.onConfirm,
          }}
          secondaryBtn={{
            text: "Huỷ bỏ",
            onClick: () =>
              setShowModal({
                show: false,
              }),
          }}
        >
          <ModalContent data={showModal.data} />
        </ModalCustom>
      )}
    </div>
  );
}

export default QuanLyComponent;
