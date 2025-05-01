import mongoose, { model } from "mongoose";

// user schema
const userSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    email:{type:String, required:true, unique:true},
})

export const userModel= mongoose.model("userData", userSchema);

// content schema

const contentSchema= new mongoose.Schema({
    title:{type:String},
    link:{type:String},
    tags:[{type:mongoose.Types.ObjectId,ref:"Tag"}],
    userId:{type:mongoose.Types.ObjectId,ref:"userData"}
})

export const contentModel=mongoose.model("content",contentSchema)

