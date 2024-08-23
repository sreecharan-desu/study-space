import { Router, Request, Response } from "express";

export const userRoute: Router = Router();

// Signup Route
userRoute.post("/signup", (req: Request, res: Response) => {
  res.status(201).json({ message: "User signed up successfully!" });
});
