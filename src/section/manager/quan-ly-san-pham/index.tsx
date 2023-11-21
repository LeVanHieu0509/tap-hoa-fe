import React, { useMemo } from "react";
import { QuanLySanPhamModalWrapper } from "./styled";
import AddModal from "./add-modal";
import FixModal from "./fix-modal";
import DeleteModal from "./delete-modal";
import { Flex } from "styles/common";
import { Button } from "@material-tailwind/react";
import { useTheme } from "styled-components";

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
            onClick={() => {}}
          >
            Xác nhận
          </Button>
        </Flex>
      )}
    </QuanLySanPhamModalWrapper>
  );
};

export default QuanLySanPhamModal;
