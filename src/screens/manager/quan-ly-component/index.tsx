import { listMappingTopic } from "@constants";
import { DataTable, TableConfig } from "@custom-types/config-table";
import { ShowModal } from "@custom-types/manager";
import { Card, CardBody, Input } from "@material-tailwind/react";
import Modal from "components/modal-dom";
import Table from "components/table";
import TableMobile from "components/table-mobile";
import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { rootAction } from "redux/reducers/root-reducer";
import QuanLyHoaDonModal from "section/manager/quan-ly-hoa-don";
import QuanLyNhanVienModal from "section/manager/quan-ly-nhan-vien";
import QuanLySanPhamModal from "section/manager/quan-ly-san-pham";
import DeleteModal from "section/manager/quan-ly-san-pham/delete-modal";
import QuanLyThanhToanModal from "section/manager/quan-ly-thanh-toan";
import { ActionsWrapper, ScrollCustom } from "styles";
import { formatValueTable } from "utils/format-value";
import Actions from "../components/actions";
import TaoHoaDonModal from "section/manager/tao-hoa-don";
import SearchInputIcon from "components/icons/source/search-input";
import dynamic from "next/dynamic";
import { ButtonIcon, ButtonSecondary } from "styles/buttons";
import useWindowResize from "hooks/use-window-resize";
import IconClose from "components/icons/source/close";

interface QuanLyComponent {
  isSelectAll?: boolean;
  isSearch?: boolean;
  tableConfig: TableConfig[];
  listFormat: any;
  type:
    | "quan-ly-san-pham"
    | "quan-ly-hoa-don"
    | "quan-ly-thanh-toan"
    | "quan-ly-nhan-vien"
    | "quan-ly-khach-hang"
    | "tao-hoa-don"
    | "show-scan";
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
  downloadBtn?: {
    text?: string;
    onClick?: (value?: any) => void;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
  };
}

const ScanBarCode = dynamic(() => import("components/scan-barcode"), { ssr: false });

export function QuanLyComponent({
  isSelectAll = false,
  isSearch = false,
  tableConfig,
  listFormat,
  type,
  addBtn,
  detailBtn,
  deleteBtn,
  updateBtn,
  customBtn,
  downloadBtn,
}: QuanLyComponent) {
  const size = useWindowResize();
  const [showCodeScan, setShowCodeScan] = useState(false);
  const dispatch = useDispatch();
  const [multiSelect, setMultiSelect] = useState([]);
  const [searchText, setSearchText] = useState<string>("");
  const [placeSearch, setPlaceSearch] = useState<string>("");

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
                  }),
              }
            }
            warringBtn={
              downloadBtn &&
              data.is_gen_product_bar_code && {
                text: "Tải Mã",
                onClick: () =>
                  setShowModal({
                    type: "download",
                    show: true,
                    data: data,
                    title: "Mời bạn tải mã vạch!",
                  }),
              }
            }
          />
        );

      default:
        return formatValueTable(data, config);
    }
  };

  const dataFilter = useMemo(() => {
    if (listFormat?.length > 0) {
      switch (type) {
        case "quan-ly-san-pham":
          setPlaceSearch("Nhập tên sản phẩm, mã vạch, mã code..");
          return listFormat.length > 0
            ? listFormat.filter(
                (item) =>
                  item.product_bar_code.includes(searchText) ||
                  item.product_code.includes(searchText) ||
                  item.product_name.includes(searchText)
              )
            : [];
        case "quan-ly-hoa-don":
          setPlaceSearch("Nhập mã hoá đơn");
          return listFormat.length > 0 ? listFormat.filter((item: any) => item.cart_code.includes(searchText)) : [];
        case "quan-ly-thanh-toan":
          setPlaceSearch("Nhập mã thanh toán, mã hoá đơn...");
          return listFormat.length > 0
            ? listFormat.filter((item) => item.cart_code.includes(searchText) || item.bills_code.includes(searchText))
            : [];

        default:
          return listFormat;
      }
    }
  }, [searchText, type, listFormat]);

  const dataTableFormat: DataTable[][] = useMemo(
    () =>
      dataFilter?.map((d: any) =>
        tableConfig.map((config) => ({
          config: config,
          node: formatValueRequest(d, config),
          originData: {
            multiSelectId: d["id"],
          },
        }))
      ),
    [dataFilter]
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
        return TaoHoaDonModal;
    }
  }, [showModal.type]);

  const handleChange = useCallback(
    (name: string, value: any) => {
      setSearchText(value);
      setShowCodeScan(false);
    },
    [searchText]
  );

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardBody className="overflow-x-scroll p-16 pt-0 pb-2">
          <ActionsWrapper justify={"space-between"}>
            <div className="sm-w-100 w-50">
              {isSearch && (
                <Input
                  icon={
                    size.width <= 876 ? (
                      <>
                        {searchText.length ? (
                          <ButtonIcon onClick={() => setSearchText("")}>
                            <IconClose />
                          </ButtonIcon>
                        ) : (
                          <svg
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowCodeScan(true)}
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5zM3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z" />
                          </svg>
                        )}
                      </>
                    ) : (
                      <>
                        {searchText.length ? (
                          <ButtonIcon onClick={() => setSearchText("")}>
                            <IconClose />
                          </ButtonIcon>
                        ) : (
                          <SearchInputIcon />
                        )}
                      </>
                    )
                  }
                  disabled={false}
                  label={""}
                  crossOrigin
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: " ml-4 before:content-none after:content-none",
                  }}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  type="text"
                  placeholder={placeSearch}
                  containerProps={{ className: "min-w-[100px]" }}
                />
              )}

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
            </div>

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
              customBtn={{
                text: "Làm mới 🔄",
                onClick: () => {
                  dispatch(rootAction.setReloading(true));
                },
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
        <Modal
          showModal={showModal.show}
          onClose={() => {
            setShowModal({
              show: false,
            });
          }}
          title={showModal.title}
          size="md"
          sizeMobile="full"
        >
          <ModalContent setShowModal={setShowModal} type={showModal.type} data={showModal.data} />
        </Modal>
      )}

      {showCodeScan == true && (
        <Modal
          showModal={showCodeScan}
          onClose={() => setShowCodeScan(false)}
          title={"Quét mã để tìm kiếm sản phẩm"}
          size="md"
          sizeMobile="full"
          actions={
            <>
              <ButtonSecondary onClick={() => setShowCodeScan(false)}>Quay về</ButtonSecondary>
            </>
          }
        >
          <ScanBarCode onChange={handleChange} />
        </Modal>
      )}
    </div>
  );
}

export default QuanLyComponent;
