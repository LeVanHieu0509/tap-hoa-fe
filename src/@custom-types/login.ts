export interface LoginInput {
  usr_name: string;
  usr_pass: string;
}

export interface ForgotPasswordInput {
  username: string;
  dob: string;
  idno: string;
}

export interface ForgotPasswordOutput {
  status: "SUCCESS" | "FAIL";
}

export interface ChangePasswordInput {
  username: string;
  password: string;
  newPassword: string;
}
