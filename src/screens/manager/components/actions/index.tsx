import { useTheme } from "styled-components";
import { Flex } from "styles/common";
import { ActionsWrapper } from "./styled";
import { Button } from "@material-tailwind/react";

interface ActionsProps {
  data: any;
  refreshBtn?: {
    text?: string;
    onClick?: (value: any) => void;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
  };
  successBtn?: {
    text?: string;
    onClick?: (value: any) => void;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
  };
  warringBtn?: {
    text?: string;
    onClick?: (value: any) => void;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
  };
  errorBtn?: {
    text?: string;
    onClick?: (value: any) => void;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
  };
  customBtn?: {
    text?: string;
    onClick?: (value: any) => void;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
  };
  detailBtn?: {
    text?: string;
    onClick?: (value: any) => void;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
  };
}

const Actions = ({ data, refreshBtn, successBtn, warringBtn, errorBtn, customBtn, detailBtn }: ActionsProps) => {
  const theme = useTheme();

  return (
    <ActionsWrapper>
      <Flex gap={8} gapMb={8}>
        {detailBtn ? (
          <Button
            disabled={detailBtn?.disabled}
            onClick={() => detailBtn?.onClick(data)}
            size={detailBtn?.size ?? "sm"}
            color="green"
            style={{
              color: "#ffffff",
              background: theme.color.status.green,
            }}
          >
            {detailBtn?.text}
          </Button>
        ) : null}

        {successBtn ? (
          <Button
            disabled={successBtn?.disabled}
            onClick={() => successBtn?.onClick(data)}
            size={successBtn?.size ?? "sm"}
            color="green"
            style={{
              color: "#ffffff",
              background: theme.color.status.primary,
            }}
          >
            {successBtn?.text}
          </Button>
        ) : null}

        {warringBtn ? (
          <Button
            disabled={warringBtn?.disabled}
            onClick={() => warringBtn?.onClick(data)}
            size={warringBtn?.size ?? "sm"}
            color="yellow"
            style={{
              color: "#ffffff",
            }}
          >
            {warringBtn?.text}
          </Button>
        ) : null}

        {errorBtn ? (
          <Button
            size={errorBtn?.size ?? "sm"}
            style={{
              color: "#ffffff",

              background: theme.color.status.red,
            }}
            disabled={errorBtn?.disabled}
            onClick={() => errorBtn?.onClick(data)}
            color="red"
          >
            {errorBtn?.text}
          </Button>
        ) : null}

        {customBtn ? (
          <Button
            style={{
              color: "#ffffff",
            }}
            disabled={customBtn?.disabled}
            onClick={() => customBtn?.onClick(data)}
            size={customBtn?.size ?? "sm"}
            color="green"
          >
            {customBtn?.text}
          </Button>
        ) : null}

        {refreshBtn ? (
          <Button
            disabled={refreshBtn?.disabled}
            onClick={() => refreshBtn?.onClick(data)}
            size={refreshBtn?.size ?? "sm"}
            color="green"
            style={{
              color: "#ffffff",
              background: theme.color.status.blue,
            }}
          >
            {refreshBtn?.text}
          </Button>
        ) : null}
      </Flex>
    </ActionsWrapper>
  );
};

export default Actions;
