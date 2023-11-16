import React, { useMemo } from "react";
import { QuanLySanPhamModalWrapper } from "./styled";
import AddModal from "./add-modal";
import FixModal from "./fix-modal";
import DeleteModal from "./delete-modal";

interface QuanLySanPhamModalProps {
  type?: string;
  data?: any;
}

const QuanLySanPhamModal = ({ data, type }: QuanLySanPhamModalProps) => {
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
      <ModalContent data={data} />
    </QuanLySanPhamModalWrapper>
  );
};

export default QuanLySanPhamModal;
