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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailToUser = exports.CheckIfUserPresent = exports.findUserByData = exports.findUserByUsername = exports.userSignupForminputValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const db_1 = require("../../../db/db");
const nodemailer_1 = __importDefault(require("nodemailer"));
const userSignupForminputValidation = (req, res, next) => {
    const { username, password, email } = req.body;
    const signupInputs = {
        username,
        password,
        email,
    };
    const zodSchemaforValidation = zod_1.default.object({
        username: zod_1.default
            .string()
            .min(6, { message: "Username must be at least 6 characters long." }),
        password: zod_1.default
            .string()
            .min(8, { message: "Password must be at least 8 characters long." }),
        email: zod_1.default.string().email({ message: "Invalid email address." }),
    });
    const verification = zodSchemaforValidation.safeParse(signupInputs);
    if (verification.success) {
        console.log("Inputs Validated");
        next();
    }
    else {
        const errors = verification.error.errors.map((err) => ({
            message: err.message,
        }));
        res.status(400).json({
            errors,
            success: false,
        });
    }
};
exports.userSignupForminputValidation = userSignupForminputValidation;
const findUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.Users.findOne({
        Username: username,
    });
    if (user == null) {
        return false;
    }
    else {
        return true;
    }
});
exports.findUserByUsername = findUserByUsername;
const findUserByData = (username, password, email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.Users.findOne({
        Username: username,
        Password: password,
        Email: email,
    });
    if (user == null) {
        return false;
    }
    else {
        return true;
    }
});
exports.findUserByData = findUserByData;
const CheckIfUserPresent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    const user = yield (0, exports.findUserByUsername)(username);
    if (user) {
        const User = yield (0, exports.findUserByData)(username, password, email);
        if (User) {
            res.json({
                msg: "Seems like you already have an account Try Signining in!",
                success: true,
            });
        }
        else {
            res.json({
                msg: `Sorry ${username} is already taken Try a new One`,
                success: false,
            });
        }
    }
    else {
        next();
    }
});
exports.CheckIfUserPresent = CheckIfUserPresent;
// Function to send an email
const sendEmailToUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    var transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: "sreecharan309@gmail.com",
            pass: "***REMOVED***",
        },
    });
    var mailOptions = {
        from: "sreecharan309@gmail.com",
        to: email,
        subject: "Sending Email using Node.js",
        text: "That was easy!",
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Email sent: " + info.response);
        }
    });
});
exports.sendEmailToUser = sendEmailToUser;
