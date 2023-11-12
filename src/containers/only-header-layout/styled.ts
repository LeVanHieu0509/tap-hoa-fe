import styled from "styled-components";
import { device } from "../../styles/media";

export const OnlyHeaderLayoutWrapper = styled.div`
  width: 100%;
  background: #ffffff;
  height: calc(100 * var(--vh));

  overflow: auto;
`;

export const MainContent = styled.div<{ showSidebar: boolean }>`
  width: 100%;
  padding-left: ${({ showSidebar }) => (showSidebar ? "96px" : "0px")};
  position: relative;

  @media ${device.mobile} {
    padding-left: 0px;
  }
`;
