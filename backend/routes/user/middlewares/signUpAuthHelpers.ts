import { Request, Response, NextFunction, RequestHandler } from "express";
import zod from "zod";
import { Users } from "../../../db/db";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Middleware for validating signup form input
export const userSignupForminputValidation: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body;
  const signupInputs = { username, password, email };

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
    let errorString: string = "";
    const errors = verification.error.errors.map((err) => ({
      path: err.path,
      message: err.message,
    }));
    errors.map((err) => {
      let errString = err.message;
      errorString += errString + ",";
    });

    res.status(400).json({
      msg: errorString.slice(0, -1), // Removing the trailing comma
      success: false,
    });
  }
};

// Function to find a user by username
export const findUserByUsername = async (username: string) => {
  const user = await Users.findOne({ Username: username });
  return user !== null;
};

// Function to find a user by username, password, and email
export const findUserByData = async (username: string, email: string) => {
  const user = await Users.findOne({
    Username: username,
    Email: email,
  });
  return user !== null;
};

// Middleware for checking if a user is present
export const CheckIfUserPresent: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body;
  const userExists = await findUserByUsername(username);

  if (userExists) {
    const user = await findUserByData(username, password);
    if (user) {
      res.status(409).json({
        msg: "Seems like you already have an account. Try signing in!",
        success: true,
      });
    } else {
      res.status(409).json({
        msg: `Sorry, ${username} already exists. Try a new one!`,
        success: false,
      });
    }
  } else {
    next();
  }
};

// Function to generate a security code
export const generateSecurityCode = (): string => {
  const code = Math.floor(1000 + Math.random() * 9000);
  return code.toString();
};

// Function to send an email to a user
export const sendEmailToUser = async (email: string, username: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SENDER_ADDRESS,
      pass: process.env.EMAIL_SENDER_PASSWORD,
    },
  });

  const securityCode = generateSecurityCode();
  const mailOptions = {
    from: process.env.EMAIL_SENDER_ADDRESS,
    to: email,
    subject: "StudySpace - Security Code",
    text: `
      Hey ${username},
      Welcome to StudySpace! You're just one step away from joining us.
      Here is your security code: ${securityCode}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      success: true,
      securityCode,
      msg: `Security code sent to ${email}`,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      msg: "Error sending email. Please try again.",
    };
  }
};

// Function to verify the security code
export const verifySecurityCode = async (
  email: string,
  securitycode: string
) => {
  const userByEmail = await Users.findOne({ Email: email });
  const userByEmailAndCode = await Users.findOne({
    Email: email,
    SecurityCode: securitycode,
  });

  if (userByEmail && userByEmailAndCode) {
    return { success: true };
  } else {
    return { success: false };
  }
};
