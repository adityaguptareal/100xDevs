import mongoose from "mongoose";
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    createdAt: { type: String, unique: true, default: Date.now },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },

})

const accountSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId, ref: "users", required: true
    },
    balance: {
        type: Number,
        required: true,
    },
    lastUpdated: {
        type: String,
        default: Date.now
    }
})

export const userModel = mongoose.model("users", userSchema)
export const accountModel = mongoose.model("accounts", accountSchema)
