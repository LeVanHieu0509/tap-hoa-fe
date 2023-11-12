import styled from "styled-components";
import { device } from "../../styles/media";

export const CustomerLayoutWrapper = styled.div`
  width: 100%;
  background: #3e3e3f;
`;

export const MainContent = styled.div<{ showSidebar: boolean }>`
  width: 100%;
  padding-left: ${({ showSidebar }) => (showSidebar ? "96px" : "0px")};
  position: relative;
  background-color: #3e3e3f;

  @media ${device.mobile} {
    padding-left: 0px;
  }
`;

export const ContentWrapper = styled.div`
  @media ${device.mobile} {
    padding: 0px;
  }
`;
