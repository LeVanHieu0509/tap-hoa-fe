import React, { useMemo } from "react";
import { QuanLyNhanVienModalWrapper } from "./styled";
import AddModal from "./add-modal";
import FixModal from "./fix-modal";
import DeleteModal from "./delete-modal";

interface QuanLyNhanVienModalProps {
  type?: string;
  data?: any;
}

const QuanLyNhanVienModal = ({ data, type }: QuanLyNhanVienModalProps) => {
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
    <QuanLyNhanVienModalWrapper>
      <ModalContent data={data} />
    </QuanLyNhanVienModalWrapper>
  );
};

export default QuanLyNhanVienModal;
