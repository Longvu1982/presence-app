import { createUser, getUserByEmail, getUserById, updateUserById } from "../db/users";
import express from "express";
import { authentication, commonRes, random } from "../helper";
import jwt from "jsonwebtoken";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email = "", password = "", fullName = "" } = req.body;
    if (!email.trim() || !password.trim() || !fullName.trim()) {
      return commonRes(res, { status: 400, message: "Missing arguments" });
    }
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return commonRes(res, { status: 400, message: "User already existed" });
    }
    const salt = random();

    const user = await createUser({
      email,
      fullName,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return commonRes(res, {
      status: 200,
      message: "Success",
      result: res.json(user),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email = "", password = "" } = req.body;
    if (!email.trim() || !password.trim()) {
      return commonRes(res, { status: 400, message: "Missing arguments" });
    }
    const existingUser = await getUserByEmail(email).select("+authentication.salt +authentication.password");

    if (!existingUser) {
      return commonRes(res, { status: 400, message: "Email not found" });
    }

    const {
      authentication: { salt, password: hashPassword },
    } = existingUser;

    if (hashPassword === authentication(salt, password)) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET_HASH_KEY, {
        expiresIn: "24h",
      });
      existingUser.authentication.sessionToken = token;
      await existingUser.save();

      existingUser.authentication.salt = undefined;
      existingUser.authentication.password = undefined;

      return commonRes(res, {
        status: 200,
        message: "Login successfully",
        result: existingUser,
      });
    } else {
      return commonRes(res, { status: 400, message: "Password incorrect" });
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body;
    if (!email?.trim()) {
      return commonRes(res, { status: 400, message: "Missing UID" });
    }
    const existingUser = await getUserByEmail(email).select("+authentication.salt +authentication.password +authentication.sessionToken");

    if (!existingUser) {
      return commonRes(res, { status: 400, message: "Email not found" });
    }

    const {
      authentication: { sessionToken },
    } = existingUser;

    console.log(sessionToken);

    if (!sessionToken) {
      return commonRes(res, {
        status: 200,
        message: "Logout successfully",
        result: true,
      });
    } else {
      existingUser.authentication.sessionToken = "";
      await existingUser.save();
      return commonRes(res, {
        status: 200,
        message: "Logout successfully",
        result: true,
      });
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};
