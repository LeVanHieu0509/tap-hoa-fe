import dynamic from "next/dynamic";
import React from "react";
import { FlexColumn } from "styles/common";

const BarcodeScannerComponent = dynamic(() => import("react-qr-barcode-scanner"), { ssr: false });

const ScanBarCodeScreen = ({ onChange }) => {
  const [data, setData] = React.useState("Không tìm thấy!");

  return (
    <div className="text-center">
      <FlexColumn justify="center" align="center">
        <p style={{ color: "black" }}>{data}</p>

        <BarcodeScannerComponent
          width={400}
          height={400}
          torch={true}
          onUpdate={(err, result) => {
            if (result) {
              setData(`Quét thành công: ${result.text}`);
              onChange("product_bar_code", result.text);
            } else {
              onChange("product_bar_code", null);
              setData("Mã vạch: Không tìm thấy!");
            }
          }}
        />
      </FlexColumn>
    </div>
  );
};

export default ScanBarCodeScreen;
