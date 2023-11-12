import request from "api";

export const getList = (body: any) => {
  return request.post("/api/call-api-o-day", body);
};
