import dynamic from "next/dynamic";
import React from "react";
import Barcode from "react-barcode";
import { Flex } from "styles/common";

const BarcodeScannerComponent = dynamic(() => import("react-qr-barcode-scanner"), { ssr: false });

const ScanBarCodeScreen = ({ onChange }) => {
  const [data, setData] = React.useState("Not Found");

  return (
    <div className="text-center">
      <Flex justify="center">
        <BarcodeScannerComponent
          width={500}
          height={500}
          torch={true}
          onUpdate={(err, result) => {
            if (result) {
              setData(result.text);
              onChange("product_bar_code", result.text);
            } else {
              onChange("product_bar_code", null);
              setData("Not Found");
            }
          }}
        />
      </Flex>

      <p style={{ color: "black" }}>{data}</p>

      <Barcode value="NH1234566788" />
    </div>
  );
};

export default ScanBarCodeScreen;
