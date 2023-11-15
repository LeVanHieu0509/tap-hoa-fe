import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";

import { useTheme } from "styled-components";
import { Flex } from "styles/common";

const ModalCustom = ({
  children,
  title,
  show,
  data,
  onCloseModal,
  secondaryBtn,
  primaryBtn,
}: {
  children: React.ReactNode | React.ReactNode[];
  data?: any;
  show?: boolean;
  title?: string;
  onCloseModal?: () => void;
  action?: (a: any, b: any) => Promise<any>;
  secondaryBtn?: {
    disable?: boolean;
    text?: string;
    onClick?: () => void;
  };
  primaryBtn?: {
    disable?: any;
    text?: string;
    onClick?: () => void;
  };
}) => {
  const theme = useTheme();

  return (
    <Dialog aria-labelledby="modal-title" open={show} handler={primaryBtn.onClick}>
      <DialogHeader>
        <Typography variant="h4">{title}</Typography>
      </DialogHeader>
      <DialogBody>{children}</DialogBody>

      {secondaryBtn || primaryBtn ? (
        <DialogFooter>
          <Flex gap={16} gapMb={16}>
            {secondaryBtn ? (
              <Button
                disabled={secondaryBtn?.disable}
                onClick={secondaryBtn?.onClick}
                style={{
                  width: "100px",
                  color: "#ffffff",
                  background: theme.color.status.red,
                }}
              >
                {secondaryBtn?.text}
              </Button>
            ) : null}
            {primaryBtn ? (
              <Button
                disabled={primaryBtn?.disable}
                style={{
                  width: "100px",
                  color: "#ffffff",
                  background: theme.color.status.primary,
                }}
                onClick={primaryBtn?.onClick}
              >
                {primaryBtn?.text}
              </Button>
            ) : null}
          </Flex>
        </DialogFooter>
      ) : null}
    </Dialog>
  );
};

export default ModalCustom;
