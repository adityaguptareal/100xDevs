"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const credenitals_1 = require("../config/credenitals");
const userMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    try {
        const jwtVerify = jsonwebtoken_1.default.verify(header, credenitals_1.jwt_Secret);
        if (jwtVerify) {
            // @ts-ignore
            req.userid = jwtVerify.id,
                next();
        }
        else {
            res.status(404).json({ message: "Invalid Token" });
        }
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
};
exports.userMiddleware = userMiddleware;
