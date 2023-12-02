import styled from "styled-components";

export const CardItemWrapper = styled.div`
  margin: 0 8px;
  max-width: 700px;

  :hover {
    background: #ccc;
    cursor: pointer;
  }

  h6 {
    font-size: 13px;
  }

  span {
    text-align: left !important;
    font-size: 11px;
    line-height: 16px;

    display: block;
  }
  p {
    font-weight: 700;
    font-size: 12px;
  }
`;

export const MobileWrapper = styled.div`
  h6 {
    font-size: 12px;
  }

  span {
    font-size: 11px;
    line-height: 16px;
  }
  p {
    font-weight: 700;
    font-size: 12px;
  }
`;
