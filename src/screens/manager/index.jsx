import dynamic from "next/dynamic";
import React from "react";
import Barcode from "react-barcode";
import { Flex } from "styles/common";
import AutoPlayer from "./auto-player";
import Player from "./play";
import Dashboard from "./layouts/dashboard";

const BarcodeScannerComponent = dynamic(() => import("react-qr-barcode-scanner"), { ssr: false });

const ManagerScreen = ({}) => {
  const [data, setData] = React.useState("Not Found");
  const [torchOn, setTorchOn] = React.useState(false);

  return (
    <div className="text-center">
      <Dashboard />
    </div>
  );
};

export default ManagerScreen;
