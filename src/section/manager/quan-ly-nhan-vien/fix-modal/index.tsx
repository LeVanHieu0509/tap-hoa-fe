import { ModifiedData } from "@custom-types";
import { Button, Card } from "@material-tailwind/react";
import { resetPass } from "api/manager";
import { Alert } from "components/alert";
import FormInput from "components/form-input";
import useActionApi from "hooks/use-action-api";
import { get, isNil, pick } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { rootAction } from "redux/reducers/root-reducer";
import { useTheme } from "styled-components";
import { Flex } from "styles/common";
import { FixModalWrapper } from "./styles";

interface FixModalProps {
  data: any;
  setShowModal: any;
}

const FixModal = ({ data, setShowModal }: FixModalProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [modifiedData, setModifiedData] = useState<ModifiedData<any>>({});
  const actionResetPass = useActionApi(resetPass);

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

  useEffect(() => {
    setModifiedData({
      username: data.usr_name,
    });
  }, [data]);

  const handleReset = () => {
    if (data) {
      actionResetPass(
        {
          usr_id: data.usr_id,
          usr_name: modifiedData.username,
          usr_pass: modifiedData.password,
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

  const disabledBtn = useMemo(
    () => Object.values(pick(modifiedData, ["username", "password"])).some((item) => item == "" || isNil(item)),
    [modifiedData]
  );

  const handleChange = useCallback(
    (name: keyof any, value: any) => {
      setModifiedData((pre) => ({ ...pre, [name]: value }));
    },
    [modifiedData]
  );

  return (
    <FixModalWrapper>
      {" "}
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
          onClick={handleReset}
        >
          Đặt lại
        </Button>
      </Flex>
    </FixModalWrapper>
  );
};

export default FixModal;
