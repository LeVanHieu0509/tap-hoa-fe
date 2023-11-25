import React from "react";
import { DownloadModalWrapper } from "./styles";
import { Flex } from "styles/common";
import Barcode from "react-barcode";

interface DownloadModalProps {
  data: any;
}

const DownloadModal = ({ data }: DownloadModalProps) => {
  return (
    <DownloadModalWrapper>
      <Flex justify="center">
        <Barcode value={data.product_bar_code} />
      </Flex>
    </DownloadModalWrapper>
  );
};

export default DownloadModal;
