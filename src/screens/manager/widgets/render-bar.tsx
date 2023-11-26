import { BarcodeScanner } from "react-barcode-qrcode-scanner";
import { TextResult } from "dynamsoft-javascript-barcode";
import React from "react";

export function BarcodeScannerCustom() {
  const [isActive, setIsActive] = React.useState(true); //whether the camera is active
  const [isPause, setIsPause] = React.useState(false); //whether the video is paused
  const [runtimeSettings, setRuntimeSettings] = React.useState(
    '{"ImageParameter":{"BarcodeFormatIds":["BF_QR_CODE"],"Description":"","Name":"Settings"},"Version":"3.0"}'
  ); //use JSON template to decode QR codes only
  const onOpened = (cam: any, camLabel: any) => {
    // You can access the video element in the onOpened event
    console.log("opened");
  };

  const onClosed = () => {
    console.log("closed");
  };

  const onDeviceListLoaded = (devices: any[]) => {
    console.log(devices);
  };

  const onScanned = (results: any[]) => {
    // barcode results
    console.log(results);
  };

  const onClicked = (result: TextResult) => {
    // when a barcode overlay is clicked
    alert(result.barcodeText);
  };

  const onInitialized = () => {
    // when the Barcode Reader is initialized
    // setInitialized(true);
  };

  return (
    <div>
      <BarcodeScanner
        isActive={isActive}
        isPause={isPause}
        license="license key for Dynamsoft Barcode Reader"
        drawOverlay={true}
        desiredCamera="back"
        desiredResolution={{ width: 1280, height: 720 }}
        runtimeSettings={runtimeSettings}
        onScanned={onScanned}
        onClicked={onClicked}
        onOpened={onOpened}
        onClosed={onClosed}
        onInitialized={onInitialized}
        onDeviceListLoaded={onDeviceListLoaded}
      ></BarcodeScanner>
    </div>
  );
}
