import { HelpTextProps } from "@custom-types";
import Icons from "components/icons";
import { isEmpty, isNil } from "lodash";
import { useEffect, useRef, useState } from "react";
import {
  CountNow,
  FieldSetWrapper,
  HelpText,
  Input,
  InputWrapper,
  MaxCount,
  TextArea,
  TextCount,
  WrapperHelpText,
  WrapperInputHasIcon,
} from "./styled";
import { Error, Label, Warning, WrapperError } from "styles/input-styled";

interface InputFieldSetProps {
  id?: string;
  name?: string;
  type?: string;
  helpText?: HelpTextProps;
  value: string | number;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  error?: string | boolean;
  warning?: string;
  maxLength?: number;
  isuppercase?: boolean;
  extend?: JSX.Element | JSX.Element[];
  noTranslateLabel?: boolean;
  onBlur?(): void;
  onChange?(e: { target: { value: string } }): void;
}

function InputFieldSet({
  id,
  name,
  type = "text",
  helpText,
  value,
  placeholder,
  required = false,
  readOnly = false,
  disabled = false,
  error,
  warning,
  maxLength,
  isuppercase = false,
  extend,
  noTranslateLabel,
  onChange,
  onBlur,
}: InputFieldSetProps) {
  const [focus, setFocus] = useState(false);
  const [autoComplete, setAutoComplete] = useState(false);

  const refInput = useRef(null);

  useEffect(() => {
    const handel = () => {
      setFocus(true);
    };
    setTimeout(() => {
      try {
        if (refInput.current.matches(":-internal-autofill-selected")) {
          setAutoComplete(true);
        }
      } catch (_) {}
    }, 300);

    refInput.current?.addEventListener?.("focus", handel);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      refInput.current?.removeEventListener?.("focus", handel);
    };
  }, []);

  const handleBlur = () => {
    onChange?.({ target: { value: value?.toString() || "" } });
    setFocus(false);
    onBlur?.();
  };

  return (
    <FieldSetWrapper>
      <InputWrapper typeInput={type} disabled={disabled} active={focus} error={!!error}>
        {type === "textarea" ? (
          <TextArea
            id={id}
            name={name}
            value={value ?? ""}
            onChange={onChange}
            disabled={disabled}
            ref={refInput}
            onBlur={handleBlur}
            readOnly={disabled || readOnly}
            maxLength={maxLength}
            autoComplete="off"
            onInput={() => setAutoComplete(false)}
          />
        ) : (
          <WrapperInputHasIcon disabled={disabled}>
            {type === "search" ? <Icons icon="search-input" /> : null}
            <Input
              id={id}
              name={name}
              type={type}
              value={value ?? ""}
              onChange={onChange}
              disabled={disabled}
              ref={refInput}
              onBlur={handleBlur}
              readOnly={disabled || readOnly}
              maxLength={maxLength}
              autoComplete="off"
              onInput={() => setAutoComplete(false)}
            />
          </WrapperInputHasIcon>
        )}
        {placeholder && (
          <Label
            error={error}
            htmlFor={id}
            focus={focus}
            required={required}
            type={type}
            disabled={disabled}
            haveValue={noTranslateLabel ? true : autoComplete || (!isEmpty(`${value}`) && !isNil(value))}
          >
            {placeholder}
            {required && <span>*</span>}
          </Label>
        )}
      </InputWrapper>

      {warning && <Warning>{warning}</Warning>}
      {extend}
      {helpText && (
        <WrapperHelpText disabled={disabled}>
          <HelpText>{helpText.content}</HelpText>
          <TextCount>
            <CountNow>{helpText.countNow}</CountNow>/<MaxCount>{helpText.maxCount}</MaxCount>
          </TextCount>
        </WrapperHelpText>
      )}
      {error && (
        <WrapperError>
          <Icons icon="error-icon" />
          <Error>{error}</Error>
        </WrapperError>
      )}
    </FieldSetWrapper>
  );
}

export default InputFieldSet;
