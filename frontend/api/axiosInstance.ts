import { getSecureValueSync, saveSecureSync } from "@/utils";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { router } from "expo-router";
import { useLayoutEffect } from "react";
import Config from "react-native-config";
const baseURL = "http://10.254.252.177:5001";

console.log(Config.GOOGLE_MAPS_API_KEY);

const axiosInstance = axios.create({ baseURL });

export const useAxiosInterceptor = () => {
  useLayoutEffect(() => {
    const reqInterceptor = (config: InternalAxiosRequestConfig<any>) => {
      const user = JSON.parse(getSecureValueSync("user") ?? "{}");
      const tokenValue = user?.sessionToken;
      config.headers.Authorization = "Bearer " + tokenValue;
      return config;
    };

    const resInterceptor = (response: AxiosResponse<any, any>) => {
      const { status, data = {} } = response;
      if (status === 405) {
        saveSecureSync("user", "{}");
        router.replace("/login");
      }

      if (status !== 200) {
        return Promise.reject({
          code: 400,
          message: "TimeOut",
          type: "request",
        });
      }
      if (data instanceof Object) {
        data.responseHeaders = response?.headers;
      }
      let responseData = data;
      const fileErrorJSON = response?.headers?.file_error;
      if (fileErrorJSON) {
        const fileError = JSON.parse(fileErrorJSON)?.Value;
        if (fileError) {
          responseData = {
            state: fileError?.State,
            errorCode: fileError?.ErrorCode,
            message: fileError?.Message,
          };
        }
      }
      const { status: state, message = "Error" } = responseData;
      switch (state) {
        case 200:
          return data;
        default:
          return Promise.reject({
            type: "request",
            status,
            message,
          });
      }
    };

    const reqIntercept = axiosInstance.interceptors.request.use(reqInterceptor);
    const resIntercept = axiosInstance.interceptors.response.use(resInterceptor);

    return () => {
      axiosInstance.interceptors.request.eject(reqIntercept);
      axiosInstance.interceptors.response.eject(resIntercept);
    };
  }, [router]);
};

export default axiosInstance;
