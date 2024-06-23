import { createUser, getUserByEmail } from "../db/users";
import express from "express";
import { authentication, random } from "../helper";
import jwt from "jsonwebtoken";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email = "", password = "", fullName = "" } = req.body;
    if (!email.trim() || !password.trim() || !fullName.trim()) {
      return res.send({ status: 400, message: "Missing arguments" });
    }
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.send({ status: 400, message: "User already existed" });
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

    return res
      .send({
        status: 200,
        message: "Success",
        result: res.json(user),
      })
      .end();
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email = "", password = "" } = req.body;
    if (!email.trim() || !password.trim()) {
      return res.send({ status: 400, message: "Missing arguments" });
    }
    const existingUser = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!existingUser) {
      return res.send({ status: 400, message: "Email not found" });
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

      return res
        .send({
          status: 200,
          message: "Login successfully",
          result: existingUser,
        })
        .end();
    } else {
      return res.send({ status: 400, message: "Password incorrect!" });
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};
