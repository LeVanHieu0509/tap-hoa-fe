import { ShowModal } from "@custom-types/manager";
import { Dispatch, SetStateAction, useMemo } from "react";
import DetailModal from "./detail-modal";
import { QuanLyThanhToanModalWrapper } from "./styled";

interface QuanLyThanhToanModalProps {
  type?: string;
  data?: any;
  setShowModal?: Dispatch<SetStateAction<ShowModal>>;
}

const QuanLyThanhToanModal = ({ data, type }: QuanLyThanhToanModalProps) => {
  const ModalContent = useMemo(() => {
    switch (type) {
      case "detail":
        return DetailModal;
    }
  }, [type]);

  return (
    <QuanLyThanhToanModalWrapper>
      <ModalContent data={data} />
    </QuanLyThanhToanModalWrapper>
  );
};

export default QuanLyThanhToanModal;
