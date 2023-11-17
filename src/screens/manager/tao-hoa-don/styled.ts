import { device } from "styles/media";
import { CheckBoxWhiteWrapper } from "./../../../components/checkbox/styled";
import styled from "styled-components";

export const TaoHoaDonScreenWrapper = styled.div``;

export const ContentOrder = styled.div`
  display: flex;
  gap: 16px;

  @media ${device.mobile} {
    flex-direction: column;
  }
`;

export const ContentLeft = styled.div`
  padding: 16px;
  width: 70%;
  border-radius: 10px;
  background: ${({ theme }) => theme.color.status.grey};

  @media ${device.mobile} {
    width: 100%;
  }
`;

export const ContentRight = styled.div`
  position: relative;
  height: 100%;
  width: 30%;
  border-radius: 10px;
  background: ${({ theme }) => theme.color.status.white};

  @media ${device.mobile} {
    width: 100%;
  }
`;
