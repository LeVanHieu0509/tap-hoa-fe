import { ModifiedData } from "@custom-types";
import { CreateAndUpdateProductsInput, ShowModal } from "@custom-types/manager";
import { Button, Card } from "@material-tailwind/react";
import { createProduct, generalAutoProduct, getProduct } from "api/manager";
import { Alert } from "components/alert";
import FormInput from "components/form-input";
import useActionApi from "hooks/use-action-api";
import useDebounce from "hooks/use-debounce";
import { cloneDeep, get, isEmpty, toNumber } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTheme } from "styled-components";
import { Flex } from "styles/common";
import { formatDateRequest } from "utils";
import { formatValue } from "utils/format-value";
import { AddModalWrapper } from "./styles";
import ModalCustom from "components/modal-custom";
import ScanBarCodeScreen from "screens/manager/widgets/render-barcode";
interface AddModalProps {
  data?: any;
  setShowModal?: any;
}

const AddModal = ({ data, setShowModal }: AddModalProps) => {
  const theme = useTheme();
  const initData: CreateAndUpdateProductsInput = {
    product_bar_code: "",
    product_code: "",
    product_name: "",
    product_description: "",
    product_image_url: "",
    product_price_origin: null,
    product_price_sell: null,
    product_quantity: null,
    product_manufacture_date: "",
    product_expired_date: "",
    categories: 1,
  };

  const [modifiedData, setModifiedData] = useState<ModifiedData<CreateAndUpdateProductsInput>>(initData);
  const [error, setError] = useState<any>({});
  const [barcodeDisplay, setBarcodeDisplay] = useState("Not Found Barcode");
  const debounceProductBarCode = useDebounce(modifiedData.product_bar_code, 500);

  const actionCreateProducts = useActionApi(createProduct);
  const actionGetProduct = useActionApi(getProduct);
  const actionGeneralAutoProduct = useActionApi(generalAutoProduct);

  let barcodeScan = "";

  const listInput: any = useMemo(
    () => [
      [
        {
          label: "Mã Hàng",
          placeHolder: "Được sinh tự động",
          name: "product_code",
          note: "",
          subType: "text",
          type: "input",
        },
        {
          label: "Mã vạch",
          name: "product_bar_code",
          note: "",
          subType: "text",
          type: "input",
          placeHolder: "Nhập hoặc quét",
          error: null,
        },
      ],
      [
        {
          label: "Tên sản phẩm",
          placeHolder: "Đối với mã vạch thì sẽ tự động sinh tên",
          name: "product_name",
          note: "",
          subType: "input",
          type: "input",
        },
      ],
      [
        {
          label: "Loại hàng",
          name: "categories",
          note: "",
          subType: "number",
          type: "select",
          placeHolder: "Min 300",
          listDropdown: [{ value: 1, key: "sản phẩm" }],
          error: null,
        },
        {
          label: "Số lượng",
          name: "product_quantity",
          note: "",
          subType: "number",
          type: "input",
          placeHolder: "Nhập số lượng sản phẩm...",
          error: error?.product_quantity,
        },
      ],
      [
        {
          label: "Giá bán",
          placeHolder: "Nhập vào đây!",
          name: "product_price_sell",
          note: "",
          subType: "input",
          type: "input",
          format: "money",
        },
        {
          label: "Giá vốn",
          placeHolder: "Nhập vào đây!",
          name: "product_price_origin",
          note: "",
          subType: "input",
          type: "input",
          format: "money",
        },
      ],
      [
        {
          label: "Ngày sản xuất",
          placeHolder: "Nhập vào đây!",
          name: "product_manufacture_date",
          note: "",
          subType: "input",
          type: "input",
        },
        {
          label: "Ngày hết hạn",
          placeHolder: "Nhập vào đây!",
          name: "product_expired_date",
          note: "",
          subType: "input",
          type: "input",
        },
      ],
      [
        {
          label: "Mô tả",
          placeHolder: "Nhập vào đây!",
          name: "product_description",
          note: "",
          subType: "textarea",
          type: "textarea",
        },
      ],
    ],
    [modifiedData]
  );

  const handleChange = useCallback(
    (name: keyof any, value: any) => {
      setModifiedData((pre) => ({ ...pre, [name]: value }));
    },
    [modifiedData]
  );

  const validate = () => {
    const cloneError = cloneDeep(error);

    // validate email
    if (!modifiedData?.categories) {
      cloneError.categories = "Vui chọn danh mục sản phẩm!";
    } else {
      delete cloneError.categories;
    }

    if (toNumber(modifiedData?.product_quantity) <= 0 || isEmpty(modifiedData?.product_quantity)) {
      cloneError.product_quantity = "Vui lòng nhập số lượng";
    } else {
      delete cloneError.product_quantity;
    }
    if (toNumber(modifiedData?.product_price_origin) < 0 || isEmpty(modifiedData?.product_price_origin)) {
      cloneError.product_price_origin = "Vui lòng nhập giá nhập";
    } else {
      delete cloneError.product_price_origin;
    }
    if (!modifiedData?.product_price_sell || isEmpty(modifiedData?.product_price_sell)) {
      cloneError.product_price_sell = "Vui lòng nhập giá bán!";
    } else {
      delete cloneError.product_price_sell;
    }

    setError(cloneError);
    return Object.keys(cloneError).length === 0;
  };

  const handleCreate = () => {
    if (validate()) {
      actionCreateProducts(
        {
          categories: modifiedData.categories,
          product_bar_code: modifiedData.product_bar_code,
          product_code: modifiedData.product_code,
          product_name: modifiedData.product_name,
          product_description: modifiedData.product_description,
          product_image_url: modifiedData.product_image_url,
          product_price_origin: toNumber(modifiedData.product_price_origin),
          product_price_sell: toNumber(modifiedData.product_price_sell),
          product_quantity: toNumber(modifiedData.product_quantity),
          product_manufacture_date: formatDateRequest(modifiedData.product_manufacture_date),
          product_expired_date: formatDateRequest(modifiedData.product_expired_date),
        },
        {
          type: "global",
          name: "",
        }
      )
        .then(({ data }) => {
          if (data.status == "1") {
            Alert("SUCCESSFUL", data.message);
            setShowModal({
              show: false,
            });
          } else {
            Alert("ERROR", data.message);
          }
        })
        .catch((e) => {
          console.log(e);
          Alert("ERROR", get(e, "response.data.message"));
        });
    }
  };

  //handle scan product_bar_code
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.keyCode == 13 && barcodeScan.length > 3) {
        handleScan(barcodeScan);
        return;
      }
      if (e.keyCode == 16) {
        return;
      }

      barcodeScan += e.key;

      setTimeout(() => {
        barcodeScan = "";
      }, 100);
      //Push Keycode to barcode scan variable
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [barcodeDisplay]);

  const handleScan = (barcodeString) => {
    setBarcodeDisplay(barcodeString);
  };

  //handle auto fill info product
  useEffect(() => {
    if (debounceProductBarCode) {
      setShowBarCode({
        show: false,
      });

      actionGetProduct(
        {
          product_bar_code: debounceProductBarCode,
        },
        {
          type: "global",
          name: "",
        }
      )
        .then(({ data }) => {
          if (data.status == "1") {
            if (data.data.product_bar_code) {
              setModifiedData({
                ...data.data,
                product_expired_date: formatValue(data.data.product_expired_date, "date"),
                product_manufacture_date: formatValue(data.data.product_manufacture_date, "date"),
              });
            } else {
              return {
                status: "-1",
                message: "NOT_FOUND_SYSTEM",
              };
            }
          } else {
            Alert("ERROR", data.message);
          }
        })
        .then((data) => {
          if (data.status == "-1") {
            actionGeneralAutoProduct(
              {
                product_bar_code: debounceProductBarCode,
              },
              {
                type: "global",
                name: "",
              }
            );
          }
        })
        .then((res) => {
          console.log("res", res);
        })
        .catch((e) => e);
    }
  }, [debounceProductBarCode]);

  const [showBarCode, setShowBarCode] = useState<ShowModal>({
    type: null,
    show: false,
    data: null,
    title: "",
  });

  return (
    <AddModalWrapper>
      <Flex justify="space-between">
        <p>Quét mã vạch: {barcodeDisplay} </p>
        <Button
          disabled={false}
          style={{
            width: "100px",
            color: "#ffffff",
            background: theme.color.status.primary,
          }}
          onClick={() => setShowBarCode({ show: true })}
        >
          Quét mã
        </Button>
      </Flex>

      <Card color="transparent" shadow={false} className="w-full">
        <div className="mt-8 mb-2 w-full">
          <FormInput listInput={listInput} modifiedData={modifiedData} onChange={handleChange} />
        </div>

        <Flex gap={16} gapMb={16} justify="flex-end">
          <Button
            disabled={false}
            onClick={() =>
              setShowModal({
                show: false,
              })
            }
            style={{
              width: "100px",
              color: "#ffffff",
              background: theme.color.status.red,
            }}
          >
            Quay lại
          </Button>

          <Button
            disabled={false}
            style={{
              width: "100px",
              color: "#ffffff",
              background: theme.color.status.primary,
            }}
            onClick={handleCreate}
          >
            Thêm mới
          </Button>
        </Flex>
      </Card>

      {showBarCode.show && (
        <ModalCustom
          type={showBarCode.type}
          show={showBarCode.show}
          onCloseModal={() => {
            setShowBarCode({
              show: false,
            });
          }}
          title={showBarCode.title}
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
          <ScanBarCodeScreen onChange={handleChange} />
        </ModalCustom>
      )}
    </AddModalWrapper>
  );
};

export default AddModal;
