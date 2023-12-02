import styled from "styled-components";
import { device } from "styles/media";

export const TabsOrderWrapper = styled.div``;
export const TaoHoaDonScreenWrapper = styled.div``;

export const ContentOrder = styled.div`
  display: flex;
  gap: 16px;

  @media ${device.mobile} {
    flex-direction: column;
  }
`;

export const ContentLeft = styled.div`
  height: calc(100vh - 250px);
  width: 70%;
  border-radius: 10px;
  background: ${({ theme }) => theme.color.status.grey};
  overflow: auto;

  @media ${device.mobile} {
    width: 100%;
    height: unset;

    margin-bottom: 170px;
  }
`;

export const ContentRight = styled.div`
  height: 100%;
  width: 30%;
  border-radius: 10px;
  background: ${({ theme }) => theme.color.status.white};

  @media ${device.mobile} {
    padding: 0 !important;
    width: 100%;
    height: 110px;
    padding: 16px 0px;
    z-index: 1;
    background: white;

    position: fixed;
    bottom: 0;
    left: 0;
    justify-content: flex-end;

    box-shadow: 0px -1px 0px #dbdfe1;
  }
`;
