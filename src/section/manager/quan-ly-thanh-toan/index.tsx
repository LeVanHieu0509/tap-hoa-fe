import { Dispatch, SetStateAction, useMemo } from "react";
import AddModal from "./add-modal";
import DeleteModal from "./delete-modal";
import FixModal from "./fix-modal";
import { QuanLyThanhToanModalWrapper } from "./styled";
import { ShowModal } from "@custom-types/manager";

interface QuanLyThanhToanModalProps {
  type?: string;
  data?: any;
  setShowModal?: Dispatch<SetStateAction<ShowModal>>;
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
