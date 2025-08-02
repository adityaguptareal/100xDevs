import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET

function userMiddleware(req: Request, res: Response, next: NextFunction) {
    const userHeader = req.headers.authorization
    if (!userHeader || !userHeader.startsWith("Bearer ")) {
        res.status(400).json({ message: "please send token" })
        return;
    }
    const token = userHeader.split(" ")[1]
    try {
        const tokenVerification = jwt.verify(token, JWT_SECRET as string)
        //@ts-ignore
        req.userId = tokenVerification.userId
        next()

    } catch (error) {
        res.status(400).json({ message: "Invalid Token" })
        return

    }

}

export default userMiddleware;