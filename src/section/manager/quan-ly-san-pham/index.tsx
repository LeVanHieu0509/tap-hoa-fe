import { Button } from "@material-tailwind/react";
import { useMemo } from "react";
import { useTheme } from "styled-components";
import { Flex } from "styles/common";
import AddModal from "./add-modal";
import DeleteModal from "./delete-modal";
import FixModal from "./fix-modal";
import { QuanLySanPhamModalWrapper } from "./styled";

interface QuanLySanPhamModalProps {
  type?: string;
  data?: any;
  setShowModal?: any;
}

const QuanLySanPhamModal = ({ setShowModal, data, type }: QuanLySanPhamModalProps) => {
  const theme = useTheme();
  const ModalContent = useMemo(() => {
    switch (type) {
      case "add":
        return AddModal;
      case "fix":
        return FixModal;
      case "delete":
        return DeleteModal;
      case "detail":
        return DeleteModal;
    }
  }, [type]);

  const handleConfirm = () => {
    switch (type) {
      case "fix":
        console.log("fix 123");
        break;
      case "delete":
        console.log("delete");
        break;
      default:
        break;
    }
  };

  return (
    <QuanLySanPhamModalWrapper>
      <ModalContent setShowModal={setShowModal} data={data} />

      {type !== "add" && (
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
            onClick={handleConfirm}
          >
            Xác nhận
          </Button>
        </Flex>
      )}
    </QuanLySanPhamModalWrapper>
  );
};

export default QuanLySanPhamModal;
