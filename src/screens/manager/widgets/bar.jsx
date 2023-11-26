import React, { useEffect, useRef } from "react";

const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasgRef = useRef(null);
  const resultRef = useRef(null);
  const soundRef = useRef(new Audio("barcode.wav"));

  useEffect(() => {
    const startVideoStream = (stream) => {
      videoRef.current.srcObject = stream;
    };

    const handleVideoError = (error) => {
      console.log(error);
    };

    const onVideoCanPlay = () => {
      const dimensions = {
        height: videoRef.current.videoHeight,
        width: videoRef.current.videoWidth,
        start: videoRef.current.videoWidth * 0.1,
        end: videoRef.current.videoWidth * 0.9,
      };

      canvasRef.current.width = dimensions.width;
      canvasRef.current.height = dimensions.height;
      canvasgRef.current.width = dimensions.width;
      canvasgRef.current.height = dimensions.height;

      drawGraphics();
      setInterval(snapshot, config.delay);
    };

    navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then(startVideoStream).catch(handleVideoError);

    videoRef.current.addEventListener("canplay", onVideoCanPlay, false);

    return () => {
      videoRef.current.removeEventListener("canplay", onVideoCanPlay);
    };
  }, []);

  const drawGraphics = () => {
    // Implement your logic to draw graphics on the canvas
  };

  const snapshot = () => {
    // Implement your logic to take a snapshot
  };

  const handleResultChange = () => {
    soundRef.current.play();
  };

  return (
    <div>
      <video ref={videoRef} id="barcodevideo" />
      <canvas ref={canvasRef} id="barcodecanvas" />
      <canvas ref={canvasgRef} id="barcodecanvasg" />
      <div ref={resultRef} id="result" onChange={handleResultChange} />
    </div>
  );
};

export default BarcodeScanner;
