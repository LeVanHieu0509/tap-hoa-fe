import React, { Dispatch, SetStateAction, useMemo } from "react";
import { QuanLyHoaDonModalWrapper } from "./styled";
import AddModal from "./add-modal";
import FixModal from "./fix-modal";
import DeleteModal from "./delete-modal";
import { ShowModal } from "@custom-types/manager";

interface QuanLyHoaDonModalProps {
  type?: string;
  data?: any;
  setShowModal?: Dispatch<SetStateAction<ShowModal>>;
}

const QuanLyHoaDonModal = ({ setShowModal, data, type }: QuanLyHoaDonModalProps) => {
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
    <QuanLyHoaDonModalWrapper>
      <ModalContent data={data} />
    </QuanLyHoaDonModalWrapper>
  );
};

export default QuanLyHoaDonModal;
