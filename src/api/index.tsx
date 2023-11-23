import axios from "axios";
import { get, set } from "lodash";
import { loadLocalItem } from "redux/store";

const URL = `${process.env.basePath}/backend`;

const request = axios.create({
  baseURL: URL,
});

request.interceptors.request.use(
  (config) => {
    const data = loadLocalItem("currentUser");
    const { tokens, user } = data ?? {};
    config.headers["cache-control"] = `no-cache`;

    if (tokens && config.method.toUpperCase() === "POST") {
      config.headers["authorization"] = `bearer ${tokens.accessToken}`;
      config.headers["user-client-id"] = user.usr_id;
    }

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
    if (status === 401 || status === 404) {
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
