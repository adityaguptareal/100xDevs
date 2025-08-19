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
exports.userRoutes = void 0;
const express_1 = require("express");
const userdb_1 = require("../../models/userdb");
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usermiddleware_1 = __importDefault(require("../middleware/usermiddleware"));
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
// Account Signup
userRoutes.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const signupSchema = zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(8).max(20),
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string()
    });
    try {
        const signupvalidation = signupSchema.safeParse(req.body);
        if (!signupvalidation.success) {
            res.status(403).json({ message: "Invalid Format", error: signupvalidation.error });
            return;
        }
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            res.status(400).send({ message: "All Fields are required" });
            return;
        }
        const userExist = yield userdb_1.userModel.findOne({ email });
        if (userExist) {
            res.status(200).json({ message: "User Already registered" });
            return;
        }
        const hasshedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield userdb_1.userModel.create({
            firstName,
            lastName,
            email,
            password: hasshedPassword
        });
        console.log(`👋 ${email} is 🎉 signup at at ${new Date}`);
        res.status(201).json({ message: "Account Created", userId: user._id });
    }
    catch (error) {
        res.status(401).json({ message: "Something Went wrong", error });
    }
}));
//Account Signin
userRoutes.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const gettingUser = yield userdb_1.userModel.findOne({ email });
        if (!gettingUser) {
            res.status(404).json({ "message": "User Not Found" });
        }
        const userVerified = yield bcrypt_1.default.compare(password, gettingUser === null || gettingUser === void 0 ? void 0 : gettingUser.password);
        if (!userVerified) {
            res.status(401).json({ message: "Invalid Credentials" });
            return;
        }
        const userToken = jsonwebtoken_1.default.sign({ userId: gettingUser === null || gettingUser === void 0 ? void 0 : gettingUser._id.toString() }, JWT_SECRET, { expiresIn: "3d" });
        res.status(200).json({ message: "User Found", accessToken: userToken });
        console.log(`👋 ${email.split("@")[0]} is sign in`);
    }
    catch (error) {
        res.status(401).json({ message: "Something Went wrong", error });
    }
}));
userRoutes.put("/update-profile", usermiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const { email, firstName, lastName, password } = req.body;
    try {
        const gettingUser = yield userdb_1.userModel.findById(userId);
        if (!gettingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const updateData = {};
        if (email)
            updateData.email = email;
        if (firstName)
            updateData.firstName = firstName;
        if (lastName)
            updateData.lastName = lastName;
        if (password) {
            updateData.password = yield bcrypt_1.default.hash(password, 10);
        }
        const updatedUser = yield userdb_1.userModel.findByIdAndUpdate(userId, updateData, { new: true });
        res.status(200).json({
            message: "Profile updated successfully",
            updatedUser: {
                email: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email,
                firstName: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.firstName,
                lastName: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.lastName
            }
        });
        console.log(`👋 ${gettingUser.firstName} updated profile details`);
    }
    catch (error) {
        res.status(400).json({ message: "Something went wrong", error });
    }
}));
userRoutes.get("/bulk", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.filter;
        if (!query) {
            const users = yield userdb_1.userModel.find({});
            res.status(200).json({ allUsers: users });
        }
        const users = yield userdb_1.userModel.find({
            $or: [
                {
                    firstName: { $regex: query, $options: "i" }
                },
                {
                    lastName: { $regex: query, $options: "i" }
                }
            ]
        });
        res.status(200).json({
            status: "Success", usrers: users
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ status: "error", message: error });
    }
}));
