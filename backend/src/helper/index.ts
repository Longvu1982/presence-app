import crypto from "crypto";
import dotenv from "dotenv";
import { CommonRes } from "types";
import express from "express";
dotenv.config();

export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) => {
  return crypto.createHmac("sha256", [salt, password].join("/")).update(process.env.SECRET_HASH_KEY).digest("hex");
};
export const commonRes = (res: express.Response, information: Partial<CommonRes>) => {
  const result: Partial<CommonRes> = {
    status: 200,
    message: "",
    result: undefined,
    ...information,
  };
  console.log(result);
  return res.send(result);
};