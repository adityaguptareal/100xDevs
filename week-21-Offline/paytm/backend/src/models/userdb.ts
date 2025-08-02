import mongoose from "mongoose";
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    createdAt: { type: String, unique: true, default: Date.now },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    firstName: { type: String },
    lastName: { type: String },

})

export const userModel = mongoose.model("users", userSchema)
