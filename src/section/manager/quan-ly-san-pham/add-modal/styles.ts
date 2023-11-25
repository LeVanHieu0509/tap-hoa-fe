import styled from "styled-components";

export const AddModalWrapper = styled.div`
  width: 100%;
`;

export const StyleCamera = styled.div`
  width: 100%;

  .container {
    position: relative;
  }

  .container,
  #interactive.viewport {
    width: 100%;
    height: 300px;
  }

  #interactive.viewport canvas,
  video {
    /* width: 100%;s
    height: 300px; */
    position: absolute;
    top: 0;
    left: 0;
  }

  #interactive.viewport canvas.drawingBuffer,
  video.drawingBuffer {
    width: 100%;
    height: 300px;
  }
`;
