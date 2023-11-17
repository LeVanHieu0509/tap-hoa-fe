import React, { useEffect, useMemo, useState } from "react";
import { QuanLyNhanVienScreenWrapper } from "./styled";
import QuanLyComponent from "../quan-ly-component";
import { TableConfig } from "@custom-types/config-table";

interface QuanLyNhanVienScreenProps {}

const tableConfig: TableConfig[] = [
  {
    key: "employee_code",
    label: "Mã nhân viên",
    type: "string",
    primary: true,
    show: true,
  },
  {
    key: "employee_name",
    label: "Tên nhân viên",
    type: "string",
    show: true,
  },
  {
    key: "employee_phone",
    label: "Số điện thoại",
    type: "string",
    show: true,
  },
  {
    key: "employee_card",
    label: "Số tài khoản",
    type: "rich-text",
    show: true,
  },
  {
    key: "button",
    label: "Chức năng",
    type: "status",
    show: true,
  },
];

const QuanLyNhanVienScreen = ({}: QuanLyNhanVienScreenProps) => {
  const [lists, setLists] = useState<any[]>([]);
  const listFormat = useMemo(
    () =>
      lists.map((item) => {
        return {
          employee_code: item.employee_code,
          employee_phone: item.employee_phone,
          employee_name: item.employee_name,
          employee_card: item.employee_card,
        };
      }),
    [lists]
  );

  useEffect(() => {
    setLists([
      {
        employee_code: "123",
        employee_phone: "123",
        employee_name: "123",
        employee_card: "123",
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
    <QuanLyNhanVienScreenWrapper>
      <QuanLyComponent
        type="quan-ly-nhan-vien"
        tableConfig={tableConfig}
        listFormat={listFormat}
        addBtn={{
          onclick: handleAddProduct,
        }}
        updateBtn={{
          onclick: handleUpdateProduct,
        }}
        deleteBtn={{
          onclick: handleDeleteProduct,
        }}
      />
    </QuanLyNhanVienScreenWrapper>
  );
};

export default QuanLyNhanVienScreen;
