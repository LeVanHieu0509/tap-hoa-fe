import { Button } from "@material-tailwind/react";
import { deleteUser } from "api/manager";
import { Alert } from "components/alert";
import useActionApi from "hooks/use-action-api";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import { rootAction } from "redux/reducers/root-reducer";
import { useTheme } from "styled-components";
import { Flex } from "styles/common";
import { DeleteModalWrapper } from "./styles";

interface DeleteModalProps {
  data: any;
  setShowModal: any;
}

const DeleteModal = ({ data, setShowModal }: DeleteModalProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const actionDeleteUser = useActionApi(deleteUser);

  const handleReset = () => {
    if (data) {
      actionDeleteUser(
        {
          usr_id: data.usr_id,
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
    <DeleteModalWrapper>
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
          style={{
            minWidth: "120px",
            color: "#ffffff",
            background: theme.color.status.primary,
          }}
          onClick={handleReset}
        >
          Xoá
        </Button>
      </Flex>
    </DeleteModalWrapper>
  );
};

export default DeleteModal;
