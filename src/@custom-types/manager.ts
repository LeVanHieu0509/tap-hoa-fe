// ------------------- APP ------------------------ //
export interface ShowModal {
  type?: "add" | "fix" | "delete";
  show: boolean;
  data?: any;
  title?: string;
  onConfirm?: () => void;
}

// ------------------- API ------------------------ //
export interface SignUpInput {
  availableTime: string;
  mobileNumber: string;
  status: string;
}

export interface SignUpOutput {
  availableTime: string;
  mobileNumber: string;
  status: string;
}
