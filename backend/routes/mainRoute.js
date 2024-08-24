"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRoute = void 0;
const express_1 = require("express");
const user_1 = require("./user/user");
exports.mainRoute = (0, express_1.Router)();
exports.mainRoute.use('/user', user_1.userRoute);
