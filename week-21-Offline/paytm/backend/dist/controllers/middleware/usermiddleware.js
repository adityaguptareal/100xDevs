"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
function userMiddleware(req, res, next) {
    const userHeader = req.headers.authorization;
    if (!userHeader || !userHeader.startsWith("Bearer ")) {
        res.status(400).json({ message: "please send token" });
        return;
    }
    const token = userHeader.split(" ")[1];
    try {
        const tokenVerification = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        //@ts-ignore
        req.userId = tokenVerification.userId;
        next();
    }
    catch (error) {
        res.status(400).json({ message: "Invalid Token" });
        return;
    }
}
exports.default = userMiddleware;
