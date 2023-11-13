import styled, { css } from "styled-components";

export const FieldSetWrapper = styled.div`
  width: 100%;
`;

const ErrorStyle = css`
  border-color: ${({ theme }) => theme.color.status.red};

  :hover {
    border-color: ${({ theme }) => theme.color.status.red};
  }
`;

export const DisableInputCss = css`
  cursor: not-allowed;
  background: ${({ theme }) => theme.color.status.grey_20};
  opacity: 1;

  color: ${({ theme }) => theme.color.text.disabled};
`;

interface InputWrapperProps {
  typeInput: string;
  disabled?: boolean;
  active?: boolean;
  error?: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  width: 100%;
  padding: ${({ typeInput }) => (typeInput == "textarea" ? "12px 10px 12px 16px" : "0px")};
  margin: 0;

  position: relative;

  border: 1px solid ${({ active }) => (active ? "#e87722" : "#DBDFE1")};
  border-radius: 4px;

  caret-color: ${({ theme }) => theme.color.status.primary};
  transition: all 0.3s ease-in-out;

  ${({ error }) => (error ? ErrorStyle : "")};

  :hover {
    border: 1px solid
      ${({ theme, active, disabled }) =>
        active ? theme.color.text.primary : disabled ? "none" : theme.color.text.placeholder};
  }

  ${({ disabled }) => (disabled ? DisableInputCss : null)};
`;

export const InputGroup = styled.div`
  width: 100%;
  position: relative;
`;

interface InputProps {
  isuppercase?: boolean;
  type?: string;
}

const InputStyle = css<InputProps>`
  width: 100%;
  height: 48px;
  padding: ${({ type }) => (type === "search" ? "12px 40px 12px 2px" : "12px 40px 12px 16px")};

  display: block;

  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  overflow: hidden;
  text-overflow: ellipsis;

  border-radius: 4px;
  text-transform: ${({ isuppercase }) => (isuppercase ? "capitalize" : "unset")};
  background: white;

  :disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.color.status.grey_20};
    opacity: 1;
    border: none;

    color: ${({ theme }) => theme.color.text.disabled};
  }

  :-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    box-shadow: 0 0 0px 1000px #fff inset;
  }
`;

export const Input = styled.input`
  ${InputStyle}
`;

export const TextArea = styled.textarea<InputProps>`
  ${InputStyle}
  height: 104px;
  min-height: 48px;
  min-width: 100%;
  max-width: 100%;
  padding: 0;
  padding-right: 16px;
  overflow-y: auto;

  //custom scrollbar
  ::-webkit-scrollbar {
    border-radius: 0;
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.15);
  }
  ::-webkit-scrollbar-track {
    border-radius: 0;
    background-color: rgba(0, 0, 0, 0);
  }
`;

interface LabelProps {
  focus?: boolean;
  disabled?: boolean;
  haveValue?: boolean;
  type?: string;
  required?: boolean;
  error?: boolean | string;
}

export const WrapperHelpText = styled.div<{ disabled?: boolean }>`
  color: ${({ theme, disabled }) => (disabled ? theme.color.text.disabled : theme.color.status.grey_darkest)};
  display: flex;
  justify-content: space-between;
  margin: 4px 16px 0px 16px;

  span {
    font-size: 12px;
  }
`;

export const HelpText = styled.span``;

export const TextCount = styled.span``;

export const CountNow = styled.span``;

export const MaxCount = styled.span``;

export const WrapperInputHasIcon = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;

  svg {
    :first-child {
      margin-left: 16px;
      path {
        fill: ${({ disabled, theme }) => (disabled ? theme.color.status.primary_50 : theme.color.status.primary)};
      }
    }

    :last-child {
      margin-right: 16px;
      cursor: pointer;
    }
  }
`;
