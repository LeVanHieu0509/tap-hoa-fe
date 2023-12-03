import styled from "styled-components";
import { device } from "styles/media";

export const InvoiceWrapper = styled.div`
  table {
  }

  @media ${device.mobile} {
    table {
      thead {
        tr {
          th {
            font-size: 12px;
            white-space: nowrap;
            padding-right: 10px;
          }
        }
      }
    }
  }
`;

export const MobileWrapper = styled.div`
  h6 {
    font-size: 12px;
  }
  h3 {
    font-size: 14px;
  }
`;
