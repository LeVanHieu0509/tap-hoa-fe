import { ShowModal } from "@custom-types/manager";
import { Dispatch, SetStateAction, useMemo } from "react";
import DetailModal from "./detail-modal";
import { QuanLyHoaDonModalWrapper } from "./styled";

interface QuanLyHoaDonModalProps {
  type?: string;
  data?: any;
  setShowModal?: Dispatch<SetStateAction<ShowModal>>;
}

const QuanLyHoaDonModal = ({ setShowModal, data, type }: QuanLyHoaDonModalProps) => {
  const ModalContent = useMemo(() => {
    switch (type) {
      case "detail":
        return DetailModal;
    }
  }, [type]);

  return (
    <QuanLyHoaDonModalWrapper>
      <ModalContent data={data} />
    </QuanLyHoaDonModalWrapper>
  );
};

export default QuanLyHoaDonModal;
