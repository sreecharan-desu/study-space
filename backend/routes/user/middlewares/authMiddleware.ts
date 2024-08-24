import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Users } from "../../../db/db";
dotenv.config();

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.json({
      msg: "Fatal : Missing Authorization header",
    });
  }
  const token = authorization?.split(" ")[1];
  if (!process.env.JWT_KEY) {
    throw new Error("Fatal : Missing JWT_KEY in the dotenv");
  }
  try {
    const response = await jwt.verify(token, process.env.JWT_KEY);
    if (response) {
      next();
    }
  } catch (e) {
    return res.json({
      msg: "Fatal : while verifying auth_token",
    });
  }
};

export const getUsernameByEmail = async (
  email: string
): Promise<string | null> => {
  const user = await Users.findOne({ Email: email });
  return user ? user.Username : null;
};

export const getUserIdByEmail = async (email: string) => {
  const user = await Users.findOne({ Email: email });
  if (!user) {
    throw new Error("fatal : user not found");
  }
  return user._id;
};
