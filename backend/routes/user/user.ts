import { Router, Request, Response } from "express";
import {
  CheckIfUserPresent,
  sendEmailToUser,
  userSignupForminputValidation,
  verifySecurityCode,
} from "./middlewares/userAuthHelpers";
import { Users } from "../../db/db";
import bcrypt from "bcrypt";

export const userRoute: Router = Router();
// Signup Route
userRoute.post(
  "/signup",
  userSignupForminputValidation,
  CheckIfUserPresent,
  async (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    const emailStatus = await sendEmailToUser(email, username);

    console.log(emailStatus.success);
    console.log(emailStatus.msg);

    if (emailStatus.success) {
      const saltRounds = 4; // Number of salt rounds to use for hashing
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await Users.create({
        Username: username,
        Password: hashedPassword,
        Email: email,
        SecurityCode: emailStatus.securityCode?.toString(),
      });
    }

    res
      .status(201)
      .json({ message: emailStatus.msg, success: emailStatus.success });
  }
);

// Verify Security Code Route
userRoute.post("/verifysecuritycode", async (req: Request, res: Response) => {
  const { email, securitycode } = req.body;
  const verification = await verifySecurityCode(email, securitycode);

  if (verification.success) {
    res.json({
      msg: "Account created successfully! Sign in now!",
      success: true,
    });
  } else {
    await Users.deleteOne({ Email: email });
    res.json({
      msg: "Invalid Security Code! Please sign up again.",
      success: false,
    });
  
});

userRoute.post("/signin", (req: Request, res: Response) => {
  const { authorization } = req.headers;
  // const token = authorization.split(" ")[1];
  // console.log(token)
});
