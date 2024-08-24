import { Request, Response, NextFunction } from "express";
import zod, { number } from "zod";
import { Users } from "../../../db/db";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

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
        msg: `Sorry ${username} with email ${email} is already exists Try a new One!`,
        success: false,
      });
    }
  } else {
    next();
  }
};

export const generateSecurityCode = (): string => {
  const code = Math.floor(1000 + Math.random() * 9000);
  return code.toString();
};

// Function to send an email
export const sendEmailToUser = async (email: string, username: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SENDER_ADDRESS, //This email also need to be changed
      pass: process.env.EMAIL_SENDER_PASSWORD, //This password needs to be changed
    },
  });

  const securityCode = generateSecurityCode(); //This needs to be parsed to Integer
  const mailOptions = {
    from: "sreecharan309@gmail.com", //noreply.studyspace@gmail.com"
    to: email,
    subject: `StudySpace - SecurityCode`,
    text: `
      Hey ${username}
      Welcome to StudySpace your are just one step away from joining us!
      Here is your securitycode : ${securityCode}
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return {
      success: true,
      securityCode,
      msg: `Security code sent to ${mailOptions.to}`,
    };
  } catch (error) {
    return {
      success: false,
      msg: `Error sending email please try again`,
    };
  }
};

export const verifySecurityCode = async (
  email: string,
  securitycode: string
) => {
  const getuserByEmail = await Users.findOne({
    Email: email,
  });

  const getuserByEmailAndSecurityCode = await Users.findOne({
    Email: email,
    SecurityCode: securitycode,
  });

  if (getuserByEmail) {
    if (getuserByEmailAndSecurityCode) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  } else {
    return {
      success: false,
    };
  }
};
