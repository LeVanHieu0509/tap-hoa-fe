import React, { useMemo } from "react";
import { ProductModalWrapper } from "./styled";
import AddModal from "./add-modal";
import FixModal from "./fix-modal";
import DeleteModal from "./delete-modal";

interface ProductModalProps {
  type?: string;
  data?: any;
}

const ProductModal = ({ data, type }: ProductModalProps) => {
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
    <ProductModalWrapper>
      <ModalContent data={data} />
    </ProductModalWrapper>
  );
};

export default ProductModal;
