"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_middlewares_1 = require("./middlewares/user-middlewares");
exports.userRoute = (0, express_1.Router)();
// Signup Route
exports.userRoute.get("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { username, password, email } = req.body;
    yield (0, user_middlewares_1.sendEmailToUser)("o210008@rguktong.ac.in");
    // await Users.create({
    //   Username: username,
    //   Password: password,
    //   Email: email,
    // });
    res.status(201).json({ message: `Account created!` });
}));
