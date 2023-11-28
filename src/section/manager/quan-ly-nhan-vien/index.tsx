import React, { Dispatch, SetStateAction, useMemo } from "react";
import { QuanLyNhanVienModalWrapper } from "./styled";
import AddModal from "./add-modal";
import FixModal from "./fix-modal";
import DeleteModal from "./delete-modal";
import { ShowModal } from "@custom-types/manager";

interface QuanLyNhanVienModalProps {
  type?: string;
  data?: any;
  setShowModal?: Dispatch<SetStateAction<ShowModal>>;
}

const QuanLyNhanVienModal = ({ setShowModal, data, type }: QuanLyNhanVienModalProps) => {
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
