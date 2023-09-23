import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4999",
  timeout: 50000,
  headers: { "X-Custom-Header": "xxx", "Access-Control-Allow-Origin": "*" },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const request = (options: Record<string, any> = {}) => {
  const AUTH_TOKEN = "Bearer " + localStorage.getItem("auth");
  // axiosInstance.defaults.headers["Content-Type"] = "application/json";
  axiosInstance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
  if (options.headers) {
    axiosInstance.defaults.headers = {
      ...axiosInstance.defaults.headers,
      ...options.headers,
    };
  }

  return axiosInstance;
};
