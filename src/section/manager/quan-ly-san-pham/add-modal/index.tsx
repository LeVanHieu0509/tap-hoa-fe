import { ModifiedData } from "@custom-types";
import { CreateAndUpdateProductsInput } from "@custom-types/manager";
import { Button, Card } from "@material-tailwind/react";
import { createProduct } from "api/manager";
import { Alert } from "components/alert";
import FormInput from "components/form-input";
import useActionApi from "hooks/use-action-api";
import { get } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { useTheme } from "styled-components";
import { Flex } from "styles/common";
import { AddModalWrapper } from "./styles";
interface AddModalProps {
  data?: any;
  setShowModal?: any;
}

const AddModal = ({ data, setShowModal }: AddModalProps) => {
  const theme = useTheme();
  const [modifiedData, setModifiedData] = useState<ModifiedData<CreateAndUpdateProductsInput>>({
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
  });

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
          error: null,
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
      console.log(name, value);
      setModifiedData((pre) => ({ ...pre, [name]: value }));
    },
    [modifiedData]
  );
  console.log("value", modifiedData);
  const actionGetProducts = useActionApi(createProduct);

  const handleCreate = () => {
    actionGetProducts(
      {
        product_bar_code: modifiedData.product_bar_code,
        product_code: modifiedData.product_code,
        product_name: modifiedData.product_name,
        product_description: modifiedData.product_description,
        product_image_url: modifiedData.product_image_url,
        product_price_origin: modifiedData.product_price_origin,
        product_price_sell: modifiedData.product_price_sell,
        product_quantity: modifiedData.product_quantity,
        product_manufacture_date: modifiedData.product_manufacture_date,
        product_expired_date: modifiedData.product_expired_date,
        categories: modifiedData.categories,
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
  };

  return (
    <AddModalWrapper>
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
    </AddModalWrapper>
  );
};

export default AddModal;
