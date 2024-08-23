import { Request, Response, NextFunction } from "express";
import zod from "zod";
import { Users } from "../../../db/db";

export const userSignupForminputValidation: Function = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body;
  const signupInputs = {
    username,
    password,
    email,
  };
  const zodSchemaforValidation = zod.object({
    username: zod
      .string()
      .min(6, { message: "Username must be at least 6 characters long." }),
    password: zod
      .string()
      .min(8, { message: "Password must be at least 8 characters long." }),
    email: zod.string().email({ message: "Invalid email address." }),
  });
  const verification = zodSchemaforValidation.safeParse(signupInputs);
  if (verification.success) {
    console.log("Inputs Validated");
    next();
  } else {
    const errors = verification.error.errors.map((err) => ({
      message: err.message,
    }));
    res.status(400).json({
      errors,
      success: false,
    });
  }
};

export const findUserByUsername = async (username: string) => {
  const user = await Users.findOne({
    Username: username,
  });
  if (user == null) {
    return false;
  } else {
    return true;
  }
};

export const findUserByData = async (
  username: string,
  password: string,
  email: string
) => {
  const user = await Users.findOne({
    Username: username,
    Password: password,
    Email: email,
  });
  if (user == null) {
    return false;
  } else {
    return true;
  }
};

export const CheckIfUserPresent: Function = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body;
  const user = await findUserByUsername(username);
  if (user) {
    const User = await findUserByData(username, password, email);
    if (User) {
      res.json({
        msg: "Seems like you already have an account Try Signining in!",
        success: true,
      });
    } else {
      res.json({
        msg: `Sorry ${username} is already taken Try a new One`,
        success: false,
      });
    }
  } else {
    next();
  }
};
