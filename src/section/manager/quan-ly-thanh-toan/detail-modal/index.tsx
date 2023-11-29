import React from "react";
import { DetailModalWrapper } from "./styles";
import Invoice from "section/manager/tao-hoa-don/invoice";

interface DetailModalProps {
  data: any;
}

const DetailModal = ({ data }: DetailModalProps) => {
  return (
    <DetailModalWrapper>
      <Invoice data={{ cart_code: data.cart_code }} />
    </DetailModalWrapper>
  );
};

export default DetailModal;
