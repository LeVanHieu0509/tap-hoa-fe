import axios from "axios";
import { get, set } from "lodash";

const URL = `${process.env.basePath}/backend`;

const request = axios.create({
  baseURL: URL,
});

request.interceptors.request.use(
  (config) => {
    config.headers["cache-control"] = `no-cache`;
    // const currentUser = getCurrentUser();
    // if (currentUser && config.method.toUpperCase() === "POST") {
    //   const { username } = getCurrentUser();
    //   config.headers["agentCode"] = username;

    // }
    config.withCredentials = true;
    return config;
  },
  (error) => {
    // handle the error
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let status = get(error, "response.status", null);
    if (status === 401 || status === 403) {
      localStorage.removeItem("currentUser");
      const event = new Event("expirestoken");
      set(event, "error", error);
      window.dispatchEvent(event);
    }
    throw error;
  }
);

export interface ResponseGenerator<T extends object> {
  config?: any;
  data?: T;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export default request;
