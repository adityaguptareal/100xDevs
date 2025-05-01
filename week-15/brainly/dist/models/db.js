"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// user schema
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});
exports.userModel = mongoose_1.default.model("userData", userSchema);
// content schema
const contentSchema = new mongoose_1.default.Schema({
    title: { type: String },
    link: { type: String },
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: "Tag" }],
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "userData" }
});
exports.contentModel = mongoose_1.default.model("content", contentSchema);
