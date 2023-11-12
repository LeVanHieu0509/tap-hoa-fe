import { SignUpInput, SignUpOutput } from "@custom-types/manager";
import request from "api";
import { CancelToken } from "axios";

export const signUpApi = (cancelToken: CancelToken, body: SignUpInput) => {
  return request.post<SignUpOutput>("/signup", body, { cancelToken });
};
