import { AxiosRequestConfig, AxiosResponse } from "axios";

export type MicroServiceNameType = "example" | "management";
export interface IRequestConfig extends AxiosRequestConfig {
  args?: Record<string, A>;
}

export type TResponseType<T> = AxiosResponse<T, IRequestConfig>;

export interface ICreateRequest {
  <Response>(generatedConfig: IRequestConfig): (model?: undefined, customConfig?: Partial<IRequestConfig>) => Promise<Response>;

  <Response, Request>(generatedConfig: IRequestConfig): (model: Request, customConfig?: Partial<IRequestConfig>) => Promise<Response>;
}
