import axiosInstance from "@/api/axiosInstance";
import { ICreateRequest, IRequestConfig } from "./types";

export const handleMergeConfig = (generatedConfig: IRequestConfig, customConfig?: Partial<IRequestConfig>): IRequestConfig => {
  return {
    ...generatedConfig,
    ...customConfig,
    headers: {
      ...generatedConfig.headers,
      ...customConfig?.headers,
    },
  };
};

const createRequest: ICreateRequest = <T, R = undefined>(generatedConfig: IRequestConfig) => {
  return async (model?: R, customAxiosConfig?: Partial<IRequestConfig>) => {
    const mergedConfig = handleMergeConfig(generatedConfig, customAxiosConfig);
    if (model && mergedConfig.method === "post") {
      if (mergedConfig.url?.includes("{")) {
        mergedConfig.args = model;
      } else {
        mergedConfig.data = model;
      }
    }
    if (model && mergedConfig.method === "get") {
      mergedConfig.args = model;
    }
    const response = await axiosInstance.request(mergedConfig);
    return response as T;
  };
};
export default createRequest;
