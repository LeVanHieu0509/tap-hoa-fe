import styled from "styled-components";
import { device } from "styles/media";

export const ListOrdersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 16px;

  p {
    margin-bottom: 0;
  }

  @media ${device.mobile} {
    height: 370px;
    overflow: auto;

    padding: 10px;
    gap: 8px;
  }
`;

export const CartItemWrapper = styled.div`
  background: white;

  input {
    width: 50px;
  }
`;

export const TableHeader = styled.div``;

export const TableContent = styled.div`
  display: flex;
  gap: 16px;

  @media ${device.mobile} {
    gap: 10px;
  }
`;

export const MobileWrapper = styled.div`
  span {
    font-size: 11px;
    line-height: 12px;
  }

  input {
    width: 45px;
    height: 30px;
  }
`;
