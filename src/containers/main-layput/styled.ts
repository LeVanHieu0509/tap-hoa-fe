import styled from "styled-components";
import { device } from "styles/media";

export const MainLayoutWrapper = styled.div<{ background?: string }>`
  width: 100%;
  background: ${({ background }) => background};
  height: calc(100 * var(--vh));

  overflow: auto;

  @media ${device.mobile} {
    flex-direction: column;
  }
`;

export const MainContent = styled.div<{ showSidebar: boolean }>`
  width: 100%;
  padding-left: ${({ showSidebar }) => (showSidebar ? "96px" : "0px")};
  position: relative;

  @media ${device.mobile} {
    padding-left: 0px;
  }
`;
