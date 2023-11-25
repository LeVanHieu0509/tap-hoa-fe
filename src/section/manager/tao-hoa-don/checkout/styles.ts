import styled from "styled-components";
import { device } from "styles/media";

export const CheckoutWrapper = styled.div`
  #summary {
    padding: 16px;
  }

  @media ${device.mobile} {
    h1 {
      font-size: 20px;
    }
  }
`;

export const TotalWrapper = styled.div`
  @media ${device.mobile} {
    padding: 0;
    padding-bottom: 16px;
  }
`;
