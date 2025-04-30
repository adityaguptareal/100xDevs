import mongoose, { model } from "mongoose";

// user schema
const userSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    email:{type:String, required:true, unique:true},
})

export const userModel= mongoose.model("userData", userSchema);


