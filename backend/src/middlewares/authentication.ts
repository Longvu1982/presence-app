import { getUserByEmail } from "../db/users";
import express from "express";
import { commonRes } from "../helper";
import { jwtDecode } from "jwt-decode";

const withoutCredentialRoutes = ["/auth"];

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const pathName = req.url;
  if (withoutCredentialRoutes.some((item) => pathName.startsWith(item))) {
      next();
      return;
  }

  const credential = req.headers.authorization;

  if (credential?.startsWith("Bearer ")) {
    try {
      const token = credential.substring(7, credential.length);
      const decoded = jwtDecode(token);
      console.log(decoded);

      const isExpired = Date.now() >= decoded?.exp * 1000;
      if (isExpired) return commonRes(res, { status: 405, message: "Unauthorized" });

      const email: string = (decoded as any)?.email;
      const currentUser = await getUserByEmail(email);

      if (!currentUser) return commonRes(res, { status: 405, message: "Token Invalid" });
    } catch (e) {
      console.log(e);
      return commonRes(res, { status: 405, message: "Token Invalid" });
    }
  } else {
    return commonRes(res, { status: 405, message: "Token Invalid" });
  }

  next();
};
