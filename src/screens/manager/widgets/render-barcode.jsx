import dynamic from "next/dynamic";
import React from "react";
import Barcode from "react-barcode";
import { Flex } from "styles/common";

const BarcodeScannerComponent = dynamic(() => import("react-qr-barcode-scanner"), { ssr: false });

const ManagerScreen = ({}) => {
  const [data, setData] = React.useState("Not Found");
  const [torchOn, setTorchOn] = React.useState(false);

  return (
    <div className="text-center">
      <Flex justify="center">
        {torchOn && (
          <BarcodeScannerComponent
            width={500}
            height={500}
            torch={torchOn}
            onUpdate={(err, result) => {
              if (result) setData(result.text);
              else setData("Not Found");
            }}
          />
        )}
      </Flex>

      <p style={{ color: "white" }}>{data}</p>
      <button style={{ color: "white" }} onClick={() => setTorchOn(!torchOn)}>
        Switch Torch {torchOn ? "Off" : "On"}
      </button>

      <Barcode value="NH1234566788" />
    </div>
  );
};

export default ManagerScreen;
