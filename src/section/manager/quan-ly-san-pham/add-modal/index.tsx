import { ModifiedData } from "@custom-types";
import { CategoriesOutput, CreateAndUpdateProductsInput, ShowModal } from "@custom-types/manager";
import { Button, Card } from "@material-tailwind/react";
import { createProduct, generalAutoProduct, getProduct } from "api/manager";
import { Alert } from "components/alert";
import FormInput from "components/form-input";
import Modal from "components/modal-dom";
import useActionApi from "hooks/use-action-api";
import useDebounce from "hooks/use-debounce";
import { get, isNil, pick, toNumber } from "lodash";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { rootAction } from "redux/reducers/root-reducer";
import { useTheme } from "styled-components";
import { ButtonSecondary } from "styles/buttons";
import { Flex } from "styles/common";
import { formatDateRequest } from "utils";
import { formatValue } from "utils/format-value";
import { AddModalWrapper, ResetWrapper } from "./styles";
interface AddModalProps {
  data?: any;
  setShowModal?: any;
  categories?: CategoriesOutput[];
}

const ScanBarCode = dynamic(() => import("components/scan-barcode"), { ssr: false });

const AddModal = ({ data, setShowModal, categories }: AddModalProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();

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
    categories: null,
  };

  const [disabled, setDisabled] = useState<any>({});
  const [modifiedData, setModifiedData] = useState<ModifiedData<CreateAndUpdateProductsInput>>(initData);
  const [showBarCode, setShowBarCode] = useState<ShowModal>({
    type: null,
    show: false,
    data: null,
    title: "",
  });

  const debounceProductBarCode = useDebounce(modifiedData.product_bar_code, 500);
  const debounceProductCode = useDebounce(modifiedData.product_code, 500);

  const actionCreateProducts = useActionApi(createProduct);
  const actionGetProduct = useActionApi(getProduct);
  const actionGeneralAutoProduct = useActionApi(generalAutoProduct);

  let barcodeScan = "";

  const listDropdownCate = useMemo(
    () => categories?.map((item) => ({ key: item.title, value: item.id.toString() })),
    [categories]
  );

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
          disabled: disabled?.product_code,
        },
        {
          label: "Mã vạch",
          name: "product_bar_code",
          note: "",
          subType: "text",
          type: "input",
          placeHolder: "Nhập hoặc quét",
          showScanCode: true,
          error: null,
          disabled: disabled?.product_bar_code,
          onClick: () => setShowBarCode({ show: true, title: "Quét mã ở đây" }),
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
          disabled: disabled?.product_name,
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
          listDropdown: listDropdownCate ?? [],
          error: null,
          disabled: disabled?.categories,
        },
        {
          label: "Số lượng",
          name: "product_quantity",
          note: "",
          subType: "number",
          type: "input",
          placeHolder: "Nhập số lượng sản phẩm...",
          error: null,
          disabled: disabled?.product_quantity,
        },
      ],
      [
        {
          label: "Giá vốn",
          placeHolder: "Nhập vào đây!",
          name: "product_price_origin",
          note: "",
          subType: "number",
          type: "input",
          format: "money",
          disabled: disabled?.product_price_origin,
        },
        {
          label: "Giá bán",
          placeHolder: "Nhập vào đây!",
          name: "product_price_sell",
          note: "",
          subType: "number",
          type: "input",
          format: "money",
          disabled: disabled?.product_price_sell,
        },
      ],
      [
        {
          label: "Ngày sản xuất",
          placeHolder: "Nhập vào đây!",
          name: "product_manufacture_date",
          note: "",
          subType: "input",
          type: "inputDate",
          disabled: disabled?.product_manufacture_date,
        },
        {
          label: "Ngày hết hạn",
          placeHolder: "Nhập vào đây!",
          name: "product_expired_date",
          note: "",
          subType: "input",
          type: "inputDate",
          disabled: disabled?.product_expired_date,
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
    [modifiedData, categories, debounceProductBarCode]
  );

  const handleChange = useCallback(
    (name: keyof CreateAndUpdateProductsInput, value: any) => {
      setModifiedData((pre) => ({ ...pre, [name]: value }));

      if (name == "product_code" && value !== "") {
        //gen ra mã vạch trùng với mã hàng
        setDisabled({
          product_bar_code: true,
        });
      } else {
        if (name == "product_code" && value == "") {
          setDisabled({
            product_bar_code: false,
          });
        } else {
          setDisabled({
            ...disabled,
          });
        }
      }
    },
    [modifiedData]
  );

  const handleCreate = () => {
    actionCreateProducts(
      {
        categories: toNumber(modifiedData.categories),
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

          dispatch(rootAction.setReloading(true));
        } else {
          Alert("ERROR", data.message);
        }
      })
      .catch((e) => {
        console.log(get(e, "response.data.message"));
      });
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
  });

  const handleScan = (barcodeString) => {
    handleChange("product_bar_code", barcodeString);
  };

  //handle auto fill info product
  useEffect(() => {
    if (debounceProductBarCode || debounceProductCode) {
      setShowBarCode({
        show: false,
      });

      let payload =
        debounceProductBarCode !== ""
          ? { product_bar_code: debounceProductBarCode }
          : { product_code: debounceProductCode };

      actionGetProduct(payload, {
        type: "local",
        name: "",
      })
        .then(({ data }) => {
          if (data.status == "1") {
            if (data.data.product_bar_code) {
              // sản phẩm đã có trong kho
              setModifiedData({
                ...data.data,
                product_quantity: null,
                categories: data.data.categories.id.toString(),
                product_expired_date: formatValue(data.data.product_expired_date, "date"),
                product_manufacture_date: formatValue(data.data.product_manufacture_date, "date"),
              });

              setDisabled({
                product_price_origin: true,
                product_price_sell: true,
                product_code: true,
                product_bar_code: true,
                product_name: true,
                categories: true,
              });
            } else {
              return {
                status: "-1",
                message: "Không tìm thấy",
              };
            }
          } else {
            Alert("ERROR", data.message);
          }
        })
        .then((data) => {
          if (data.status == "-1" && debounceProductBarCode !== "") {
            //sản phẩm chưa có trong kho thì sẽ phải nhập từ đầu trừ name ra nếu như có mã vạch.
            actionGeneralAutoProduct(
              {
                product_bar_code: debounceProductBarCode,
              },
              {
                type: "global",
                name: "",
              }
            ).then(({ data }) => {
              // Nếu như crawl được data thì mới filter vào
              if (data.data?.product_name) {
                handleChange("product_name", data.data?.product_name);
                handleChange("product_image_url", data.data?.product_image_url);
                handleChange("product_code", "");
                handleChange("product_quantity", null);
                handleChange("product_price_origin", null);
                handleChange("product_price_sell", null);
                handleChange("product_manufacture_date", null);
                handleChange("product_expired_date", "");
                handleChange("product_description", "");
                handleChange("categories", null);

                setDisabled({
                  product_code: true,
                  product_name: false,
                  categories: false,
                });
              } else {
                handleChange("product_name", "");
                handleChange("product_image_url", "");
                handleChange("product_code", "");
                handleChange("product_quantity", null);
                handleChange("product_price_origin", null);
                handleChange("product_price_sell", null);
                handleChange("product_manufacture_date", null);
                handleChange("product_expired_date", "");
                handleChange("product_description", "");
                handleChange("categories", null);

                setDisabled({
                  product_bar_code: false,
                  product_code: true,
                  product_name: false,
                  categories: false,
                });

                Alert("WARNING", "Không lấy được tên sản phẩm, vui lòng nhập vào!");
                return;
              }
            });
          }
        })

        .catch((e) => console.log(get(e, "response.data.message")));
    }
  }, [debounceProductBarCode, debounceProductCode]);

  const disabledBtn = useMemo(
    () =>
      Object.values(
        pick(modifiedData, [
          "categories",
          "product_name",
          "product_quantity",
          "product_price_sell",
          "product_price_origin",
          "product_expired_date",
          "product_manufacture_date",
        ])
      ).some((item) => item == "" || isNil(item)),
    [modifiedData]
  );

  return (
    <AddModalWrapper>
      <ResetWrapper className="mb-10 absolute " justify="flex-end">
        <Button
          size="sm"
          disabled={false}
          onClick={() => {
            setModifiedData(initData);
            setDisabled({});
          }}
          style={{
            color: "#ffffff",
            background: theme.color.status.blue,
          }}
        >
          Reset
        </Button>
      </ResetWrapper>

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
              minWidth: "120px",
              color: "#ffffff",
              background: theme.color.status.red,
            }}
          >
            Quay lại
          </Button>

          <Button
            disabled={disabledBtn}
            style={{
              minWidth: "120px",
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
        <Modal
          showModal={showBarCode.show}
          onClose={() => {
            setShowBarCode({
              show: false,
            });
          }}
          title={showBarCode.title}
          size="md"
          sizeMobile="full"
          actions={
            <>
              <ButtonSecondary
                onClick={() =>
                  setShowBarCode({
                    show: false,
                  })
                }
              >
                Quay về
              </ButtonSecondary>
            </>
          }
        >
          <ScanBarCode onChange={handleChange} />
        </Modal>
      )}
    </AddModalWrapper>
  );
};

export default AddModal;
