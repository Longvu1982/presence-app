import createRequest from "../helper";

export default {
  login: createRequest<any, { email: string; password: string }>({
    url: "/auth/login",
    method: "post",
  }),
  logout: createRequest<{ result: boolean }, { email: string }>({
    url: "/auth/logout",
    method: "post",
  }),
};
