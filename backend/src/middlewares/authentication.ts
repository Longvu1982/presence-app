import express from "express";
import { jwtDecode } from "jwt-decode";

const withoutCredentialRoutes = ["/auth"];

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log("Run middleware");

  const pathName = req.url;
  if (withoutCredentialRoutes.some((item) => pathName.startsWith(item))) {
    next();
    return;
  }

  const credential = req.headers.authorization;

  if (credential.startsWith("Bearer ")) {
    const token = credential.substring(7, credential.length);
    const decoded = jwtDecode(token).exp;

    const isExpired = Date.now() >= decoded * 1000;

    console.log(decoded);
  }

  next();
};
