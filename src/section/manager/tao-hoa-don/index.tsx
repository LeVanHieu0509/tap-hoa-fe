import { Dispatch, SetStateAction, useMemo } from "react";
import AddModal from "./add-modal";
import DeleteModal from "./delete-modal";
import FixModal from "./fix-modal";
import { TaoHoaDonModalWrapper } from "./styled";
import { ShowModal } from "@custom-types/manager";

interface TaoHoaDonModalProps {
  type?: string;
  data?: any;
  setShowModal?: Dispatch<SetStateAction<ShowModal>>;
}

const TaoHoaDonModal = ({ data, type, setShowModal }: TaoHoaDonModalProps) => {
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
    <TaoHoaDonModalWrapper>
      <ModalContent data={data} />
    </TaoHoaDonModalWrapper>
  );
};

export default TaoHoaDonModal;
