import { toast, ToastOptions } from "react-toastify";
import Icons from "../icons";

export type AlertType = "SUCCESSFUL" | "ERROR" | "WARNING" | "TO_DO" | null;

export const Alert = (type: AlertType, message: string, options?: ToastOptions) => {
  switch (type) {
    case "SUCCESSFUL": {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
        theme: "dark",
        hideProgressBar: true,
        icon: <Icons icon="tick" />,
        ...options,
      });
      break;
    }
    case "ERROR": {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        icon: <Icons icon="close" color="white" />,
        theme: "dark",
        ...options,
      });
      break;
    }
    case "WARNING": {
      toast.warn(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        icon: <Icons icon="tick" />,
        theme: "dark",
        ...options,
      });
      break;
    }
    case "TO_DO": {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        icon: <Icons icon="tick" />,
        hideProgressBar: true,
        theme: "dark",
        autoClose: 3000,
        ...options,
      });
      break;
    }
    default:
      toast.info(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        icon: <Icons icon="tick" />,
        autoClose: false,
        theme: "dark",
        ...options,
      });
  }
};
