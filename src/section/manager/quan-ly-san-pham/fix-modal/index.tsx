import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FixModalWrapper } from "./styles";
import { ModifiedData } from "@custom-types";
import { CategoriesOutput, CreateAndUpdateProductsInput } from "@custom-types/manager";
import { useTheme } from "styled-components";
import { Button, Card } from "@material-tailwind/react";
import FormInput from "components/form-input";
import { Flex } from "styles/common";
import useActionApi from "hooks/use-action-api";
import { getCategories, getProduct, updateProduct } from "api/manager";
import { formatValue } from "utils/format-value";
import { Alert } from "components/alert";
import { get, toNumber } from "lodash";
import { formatDateRequest } from "utils";
import { rootAction } from "redux/reducers/root-reducer";
import { useDispatch } from "react-redux";

interface FixModalProps {
  data: any;
  setShowModal?: any;
}

const FixModal = ({ setShowModal, data }: FixModalProps) => {
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
    categories: 1,
  };

  const [modifiedData, setModifiedData] = useState<ModifiedData<CreateAndUpdateProductsInput>>(initData);
  const [categories, setCategories] = useState<CategoriesOutput[]>([]);
  const actionGetProduct = useActionApi(getProduct);
  const actionUpdateProduct = useActionApi(updateProduct);
  const actionGetCategories = useActionApi(getCategories);

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
          disabled: true,
        },
        {
          label: "Mã vạch",
          name: "product_bar_code",
          note: "",
          subType: "text",
          type: "input",
          placeHolder: "Nhập hoặc quét",
          showScanCode: false,
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
          listDropdown: listDropdownCate ?? [],
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
          showMaxQuantity: true,
          onClick: () => setModifiedData((pre) => ({ ...pre, product_quantity: 999999999 })),
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
          type: "inputDate",
        },
        {
          label: "Ngày hết hạn",
          placeHolder: "Nhập vào đây!",
          name: "product_expired_date",
          note: "",
          subType: "input",
          type: "inputDate",
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

  //get categories
  useEffect(() => {
    actionGetCategories({
      type: "global",
      name: "",
    })
      .then(({ data }) => {
        if (data.status == "1") {
          setCategories(data.data);
        }
      })
      .catch((e) => e);
  }, []);

  useEffect(() => {
    if (data) {
      actionGetProduct(
        {
          product_code: data.product_code,
        },
        {
          type: "global",
          name: "",
        }
      ).then(({ data }) => {
        if (data.status == "1") {
          if (data.data.product_bar_code) {
            setModifiedData({
              ...data.data,
              categories: data.data.categories.id.toString(),
              product_expired_date: data.data.product_expired_date
                ? formatValue(data.data.product_expired_date, "date")
                : null,
              product_manufacture_date: data.data.product_manufacture_date
                ? formatValue(data.data.product_manufacture_date, "date")
                : null,
            });
          }
        } else {
          Alert("ERROR", data.message);
        }
      });
    }
  }, [data]);

  const handleChange = useCallback(
    (name: keyof any, value: any) => {
      setModifiedData((pre) => ({ ...pre, [name]: value }));
    },
    [modifiedData]
  );

  const handleUpdate = () => {
    if (data) {
      actionUpdateProduct(
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
          product_manufacture_date: modifiedData.product_manufacture_date
            ? formatDateRequest(modifiedData.product_manufacture_date)
            : null,
          product_expired_date: modifiedData.product_expired_date
            ? formatDateRequest(modifiedData.product_expired_date)
            : null,
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
    }
  };

  return (
    <FixModalWrapper>
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
              width: "140px",
              color: "#ffffff",
              background: theme.color.status.red,
            }}
          >
            Quay lại
          </Button>

          <Button
            disabled={false}
            style={{
              width: "140px",
              color: "#ffffff",
              background: theme.color.status.primary,
            }}
            onClick={handleUpdate}
          >
            Cập nhật
          </Button>
        </Flex>
      </Card>
    </FixModalWrapper>
  );
};

export default FixModal;
