"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new mongoose_1.default.Schema({
    createdAt: { type: String, unique: true, default: Date.now },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    firstName: { type: String },
    lastName: { type: String },
});
exports.userModel = mongoose_1.default.model("users", userSchema);
