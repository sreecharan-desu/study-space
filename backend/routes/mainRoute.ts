import express from "express";
import { Router } from "express";
import { userRoute } from "./user/user";

export const mainRoute: Router = Router();
mainRoute.use(express.json());
mainRoute.use(express.urlencoded({ extended: true }));
mainRoute.use("/user", userRoute);
