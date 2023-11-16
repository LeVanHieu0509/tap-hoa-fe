import { useMemo } from "react";
import AddModal from "./add-modal";
import DeleteModal from "./delete-modal";
import FixModal from "./fix-modal";
import { QuanLyThanhToanModalWrapper } from "./styled";

interface QuanLyThanhToanModalProps {
  type?: string;
  data?: any;
}

const QuanLyThanhToanModal = ({ data, type }: QuanLyThanhToanModalProps) => {
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
    <QuanLyThanhToanModalWrapper>
      <ModalContent data={data} />
    </QuanLyThanhToanModalWrapper>
  );
};

export default QuanLyThanhToanModal;
