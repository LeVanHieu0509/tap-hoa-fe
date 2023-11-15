import React, { useEffect, useMemo, useState } from "react";
import { QuanLyHoaDonScreenWrapper } from "./styled";
import QuanLyComponent from "../quan-ly-component";
import { TableConfig } from "@custom-types/config-table";

interface QuanLyHoaDonScreenProps {}

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
    label: "Trạng thái hoá đơn",
    type: "string",
    show: true,
  },
  {
    key: "product_name",
    label: "Tổng tiền",
    type: "string",
    show: true,
  },
  {
    key: "Ngày tạo hoá đơn",
    label: "Mô tả",
    type: "rich-text",
    show: true,
  },
  {
    key: "product_price_origin",
    label: "Ngày hoá",
    type: "number",
    show: true,
  },
  {
    key: "button",
    label: "Chức năng",
    type: "status",
    show: true,
  },
];

const QuanLyHoaDonScreen = ({}: QuanLyHoaDonScreenProps) => {
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
    <QuanLyHoaDonScreenWrapper>
      <QuanLyComponent
        onAdd={handleAddProduct}
        onUpdate={handleUpdateProduct}
        onDelete={handleDeleteProduct}
        tableConfig={tableConfig}
        listFormat={listFormat}
      />
    </QuanLyHoaDonScreenWrapper>
  );
};

export default QuanLyHoaDonScreen;
