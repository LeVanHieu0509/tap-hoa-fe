import React, { useEffect, useMemo, useState } from "react";
import { QuanLyKhachHangScreenWrapper } from "./styled";
import QuanLyComponent from "../quan-ly-component";
import { TableConfig } from "@custom-types/config-table";

interface QuanLyKhachHangScreenProps {}

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

const QuanLyKhachHangScreen = ({}: QuanLyKhachHangScreenProps) => {
  const [lists, setLists] = useState<any[]>([]);
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

  const handleAddProduct = () => {
    console.log("add product");
  };

  const handleUpdateProduct = () => {
    console.log("fix product");
  };

  const handleDeleteProduct = () => {
    console.log("delete product");
  };

  return (
    <QuanLyKhachHangScreenWrapper>
      <QuanLyComponent
        onAdd={handleAddProduct}
        onUpdate={handleUpdateProduct}
        onDelete={handleDeleteProduct}
        tableConfig={tableConfig}
        listFormat={listFormat}
      />
    </QuanLyKhachHangScreenWrapper>
  );
};

export default QuanLyKhachHangScreen;
