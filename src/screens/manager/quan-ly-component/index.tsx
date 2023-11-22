import { listMappingTopic } from "@constants";
import { DataTable, TableConfig } from "@custom-types/config-table";
import { ShowModal } from "@custom-types/manager";
import { Card, CardBody } from "@material-tailwind/react";
import ModalCustom from "components/modal-custom";
import Table from "components/table";
import TableMobile from "components/table-mobile";
import { useMemo, useState } from "react";
import QuanLyHoaDonModal from "section/manager/quan-ly-san-pham";
import DeleteModal from "section/manager/quan-ly-san-pham/delete-modal";
import { ActionsWrapper, ScrollCustom } from "styles";
import { formatValueTable } from "utils/format-value";
import Actions from "../components/actions";
import QuanLySanPhamModal from "section/manager/quan-ly-san-pham";
import QuanLyThanhToanModal from "section/manager/quan-ly-thanh-toan";
import QuanLyNhanVienModal from "section/manager/quan-ly-nhan-vien";

interface QuanLyComponent {
  isSelectAll?: boolean;
  tableConfig: TableConfig[];
  listFormat: any;
  type:
    | "quan-ly-san-pham"
    | "quan-ly-hoa-don"
    | "quan-ly-thanh-toan"
    | "quan-ly-nhan-vien"
    | "quan-ly-khach-hang"
    | "tao-hoa-don";
  addBtn?: {
    text?: string;
    onClick?: (value?: any) => void;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
  };
  detailBtn?: {
    text?: string;
    onClick?: (value?: any) => void;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
  };

  deleteBtn?: {
    text?: string;
    onClick?: (value?: any) => void;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
  };
  updateBtn?: {
    text?: string;
    onClick?: (value?: any) => void;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
  };
  customBtn?: {
    text?: string;
    onClick?: (value?: any) => void;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
  };
}

export function QuanLyComponent({
  isSelectAll = false,
  tableConfig,
  listFormat,
  type,
  addBtn,
  detailBtn,
  deleteBtn,
  updateBtn,
  customBtn,
}: QuanLyComponent) {
  const [multiSelect, setMultiSelect] = useState([]);
  const [showModal, setShowModal] = useState<ShowModal>({
    type: null,
    show: false,
    data: null,
    title: "",
  });

  const nameType = useMemo(() => listMappingTopic.find((item) => item.key == type).value, [type]);

  const formatValueRequest = (data: any, config: TableConfig) => {
    switch (config.key) {
      case "button":
        return (
          <Actions
            data={data}
            successBtn={
              updateBtn && {
                text: "Sửa",
                onClick: () =>
                  setShowModal({
                    type: "fix",
                    show: true,
                    data: data,
                    title: `Sửa ${nameType}`,
                    onConfirm: updateBtn.onClick,
                  }),
              }
            }
            detailBtn={
              detailBtn && {
                text: "Xem chi tiết",
                onClick: () =>
                  setShowModal({
                    type: "detail",
                    show: true,
                    data: data,
                    title: `Xem chi tiết ${nameType}`,
                    onConfirm: detailBtn.onClick,
                  }),
              }
            }
            errorBtn={
              deleteBtn && {
                text: "Xoá",
                onClick: () =>
                  setShowModal({
                    type: "delete",
                    show: true,
                    data: data,
                    title: "Bạn có chắc chắn xoá?",
                    onConfirm: deleteBtn.onClick,
                  }),
              }
            }
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
    switch (type) {
      case "quan-ly-san-pham":
        return QuanLySanPhamModal;
      case "quan-ly-hoa-don":
        return QuanLyHoaDonModal;
      case "quan-ly-thanh-toan":
        return QuanLyThanhToanModal;
      case "quan-ly-nhan-vien":
        return QuanLyNhanVienModal;
      case "tao-hoa-don":
        return DeleteModal;
    }
  }, [showModal.type]);

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
              successBtn={
                addBtn && {
                  text: `Thêm ${nameType} ✅`,
                  onClick: () =>
                    setShowModal({
                      type: "add",
                      show: true,
                      data: null,
                      title: `Mời bạn thêm ${nameType}!`,
                    }),
                }
              }
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
          type={showModal.type}
          show={showModal.show}
          onCloseModal={() => {
            setShowModal({
              show: false,
            });
          }}
          title={showModal.title}
          // primaryBtn={{
          //   text: "Xác nhận",
          //   onClick: showModal.onConfirm,
          // }}
          // secondaryBtn={{
          //   text: "Huỷ bỏ",
          //   onClick: () =>
          //     setShowModal({
          //       show: false,
          //     }),
          // }}
        >
          <ModalContent setShowModal={setShowModal} type={showModal.type} data={showModal.data} />
        </ModalCustom>
      )}
    </div>
  );
}

export default QuanLyComponent;
