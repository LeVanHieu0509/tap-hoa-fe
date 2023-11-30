import styled, { css } from "styled-components";
import { Flex } from "styles/common";
import { device } from "styles/media";

export const ListProductsWrapper = styled.div``;

export const TaoHoaDonScreenWrapper = styled.div``;
export const DropdownWrapper = styled(Flex)`
  min-width: 50%;

  @media ${device.mobile} {
    width: 100%;
  }
`;

export const HeaderWrapper = styled(Flex)`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  left: 0;

  border-radius: 8px;
  background: ${({ theme }) => theme.color.status.primary};
  padding: 10px;
  @media ${device.mobile} {
    flex-direction: column;
  }
`;

export const ButtonCartWrapper = styled(Flex)`
  width: 65%;
  align-items: center;
  justify-content: flex-end;
  @media ${device.mobile} {
    width: 100%;
    justify-content: space-between;
  }
`;

export const CardInsuranceItemWrapper = styled.div<{ active?: boolean; col?: number }>`
  min-width: calc((100% / ${({ col }) => col}));
  cursor: pointer;

  ${({ active }) => (active ? activeCss : null)};

  @media ${device.mobile} {
    min-width: calc((95% / 2));
  }
`;

const activeCss = css`
  background: #fae4d3;
  border: 2px solid ${({ theme }) => theme.color.status.primary};
`;

export const SlideWrapper = styled.div`
  /* width: 100%;

  @media ${device.mobile} {
    width: 80%;
  } */
`;
