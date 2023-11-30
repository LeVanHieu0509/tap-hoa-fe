import { TableConfig } from "@custom-types/config-table";
import { UserProps } from "@custom-types/login";
import { getUsers } from "api/manager";
import { Alert } from "components/alert";
import useActionApi from "hooks/use-action-api";
import { useAppSelector } from "hooks/use-redux";
import { get } from "lodash";
import { useEffect, useMemo, useState } from "react";
import QuanLyComponent from "../quan-ly-component";
import { QuanLyNhanVienScreenWrapper } from "./styled";

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
    label: "Tên đăng nhập",
    type: "string",
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
  const [lists, setLists] = useState<UserProps[]>([]);
  const actionGetAllEmployee = useActionApi(getUsers);

  const { reLoading, currentUser } = useAppSelector((r) => r.rootReducer);
  const listFormat = useMemo(
    () =>
      lists?.map((item) => {
        return {
          employee_code: item.usr_id,
          employee_name: item.usr_name,
          ...item,
        };
      }),
    [lists]
  );

  useEffect(() => {
    if (currentUser || reLoading) {
      actionGetAllEmployee(
        {
          limit: "",
          sortOrder: "ASC",
          sortBy: "createdAt",
          page: "",
          filter: {},
          select: null,
        },
        {
          type: "global",
          name: "",
        }
      )
        .then(({ data }) => {
          if (data.status == "1") {
            setLists(data.data.users);
          } else {
            Alert("ERROR", data.message);
          }
        })
        .catch((e) => console.log(get(e, "response.data.message")));
    }
  }, [reLoading, currentUser]);

  return (
    <QuanLyNhanVienScreenWrapper>
      <QuanLyComponent
        type="quan-ly-nhan-vien"
        tableConfig={tableConfig}
        listFormat={listFormat}
        addBtn
        updateBtn
        // deleteBtn
      />
    </QuanLyNhanVienScreenWrapper>
  );
};

export default QuanLyNhanVienScreen;
