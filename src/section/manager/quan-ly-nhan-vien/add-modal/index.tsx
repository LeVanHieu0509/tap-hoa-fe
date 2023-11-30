import React, { useCallback, useMemo, useState } from "react";
import { AddModalWrapper } from "./styles";
import { Button, Card } from "@material-tailwind/react";
import FormInput from "components/form-input";
import { ModifiedData } from "@custom-types";
import { Flex } from "styles/common";
import { get, isNil, pick } from "lodash";
import { useTheme } from "styled-components";
import useActionApi from "hooks/use-action-api";
import { signUp } from "api/auth";
import { useRouter } from "next/router";
import { Alert } from "components/alert";
import { rootAction } from "redux/reducers/root-reducer";
import { useDispatch } from "react-redux";

interface AddModalProps {
  data?: any;
  setShowModal?: any;
}

const AddModal = ({ data, setShowModal }: AddModalProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [modifiedData, setModifiedData] = useState<ModifiedData<any>>({});

  const action = useActionApi(signUp);

  const listInput: any = useMemo(
    () => [
      [
        {
          label: "Tên tài khoản",
          placeHolder: "Không được viết có dấu...",
          name: "username",
          note: "",
          subType: "text",
          type: "input",
          disabled: false,
        },
        {
          label: "Mật khẩu",
          name: "password",
          note: "",
          subType: "text",
          type: "input",
          placeHolder: "Mật khẩu lớn hơn 6 kí tự",
          error: null,
          disabled: false,
          onClick: () => {},
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

  const disabledBtn = useMemo(
    () => Object.values(pick(modifiedData, ["username", "password"])).some((item) => item == "" || isNil(item)),
    [modifiedData]
  );

  const handleCreate = () => {
    action(
      {
        usr_name: modifiedData.username?.trim(),
        password: modifiedData.password,
      },
      {
        type: "global",
        name: "",
      }
    )
      .then(({ data }) => {
        if (data.status == "1") {
          Alert("SUCCESSFUL", data.message);
          setShowModal({ show: false });
          dispatch(rootAction.setReloading(true));
        } else {
          Alert("ERROR", data.message);
        }
      })
      .catch((e) => console.log(get(e, "response.data.message")));
  };

  return (
    <AddModalWrapper>
      <Card color="transparent" shadow={false} className="w-full">
        <div className="mt-8 mb-2 w-full">
          <FormInput listInput={listInput} modifiedData={modifiedData} onChange={handleChange} />
        </div>
      </Card>

      <Flex gap={16} gapMb={16} justify="flex-end">
        <Button
          disabled={false}
          onClick={() => setShowModal({ show: false })}
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
    </AddModalWrapper>
  );
};

export default AddModal;
