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

    #summary {
      padding: 8px 16px;
    }
  }
`;

export const TotalWrapper = styled.div`
  @media ${device.mobile} {
    margin: 0;
    padding: 0;
    padding-bottom: 16px;
  }
`;
