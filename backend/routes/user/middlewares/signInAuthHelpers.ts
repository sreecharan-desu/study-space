import zod from "zod";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { Users } from "../../../db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const signinSchema = zod.object({
  email: zod
    .string()
    .email({ message: "Invalid email address (use your college email)" }),
  password: zod
    .string()
    .min(6, { message: "Your password must contain at least 6 characters" }),
});

export const validateSigninForm: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const signinInputs = { email, password };
  const verification = signinSchema.safeParse(signinInputs);
  if (verification.success) {
    console.log("Inputs Validated");
    next();
  } else {
    let errorString = "";
    verification.error.errors.forEach((err) => {
      const errString = `${err.message}`;
      errorString += errString + ",";
    });

    res.status(400).json({
      msg: errorString.slice(0, -1), // Removing the trailing comma
      success: false,
    });
  }
};

export const fetchDbByEmail = async (email: string) => {
  const user = await Users.findOne({
    Email: email,
  });
  return user != null;
};

export const comparePasswords = async (
  email: string,
  password: string
): Promise<{ success: boolean } | false> => {
  const user = await Users.findOne({ Email: email });

  if (!user) {
    return false;
  }

  const match = await bcrypt.compare(password, user.Password);

  return { success: match };
};

export const fetchUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const emailFound = await fetchDbByEmail(email);
    if (!emailFound) {
      return res.status(404).json({
        msg: "Seems like you don't have an account. Go signup now!",
        success: false,
      });
    }
    const passwordAuth = await comparePasswords(email, password);
    // Check if passwordAuth is false or an object
    if (passwordAuth && passwordAuth.success) {
      // Code runs iff passwordAuth is an object and success is true
      return next();
    } else {
      return res.status(401).json({
        msg: "Check your password again",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: "An error occurred during authentication",
      success: false,
    });
  }
};

export const generateJWT = async (email: string) => {
  const jwtKey = process.env.JWT_KEY;
  if (!jwtKey) {
    throw new Error("JWT_KEY is not defined in environment variables");
  }
  try {
    const token = jwt.sign(email, jwtKey);
    return token;
  } catch (error) {
    throw new Error(`Error generating JWT: ${error}`);
  }
};
