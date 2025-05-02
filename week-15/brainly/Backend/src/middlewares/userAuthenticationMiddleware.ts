import jwt from "jsonwebtoken";
import { jwt_Secret } from "../config/credenitals";
import { NextFunction, Request, Response } from "express";



export const userMiddleware=(req:Request, res:Response, next:NextFunction)=>{
    const header = req.headers["authorization"]
    try {     
        const jwtVerify = jwt.verify(header as string, jwt_Secret)
        if (jwtVerify) {
            // @ts-ignore
            req.userid = jwtVerify.id,
                next()
        }else{
            res.status(404).json({message:"Invalid Token"})
        }
    } catch (error) {
        res.status(400).json({message:error})
    }
}


