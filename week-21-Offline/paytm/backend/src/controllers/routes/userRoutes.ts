import { Router, Request, Response } from "express"
import { userModel } from "../../models/userdb"
import { email, json, z } from "zod"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userMiddleware from "../middleware/usermiddleware"
const userRoutes = Router()
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET

// Account Signup
userRoutes.post("/signup", async (req: Request, res: Response) => {
    const signupSchema = z.object({
        email: z.email(),
        password: z.string().min(8).max(20),
        firstName: z.string(),
        lastName: z.string()
    })
    try {
        const signupvalidation = signupSchema.safeParse(req.body)
        if (!signupvalidation.success) {
            res.status(403).json({ message: "Invalid Format", error: signupvalidation.error })
            return
        }


        const { firstName, lastName, email, password } = req.body
        if (!firstName || !lastName || !email || !password) {
            res.status(400).send({ message: "All Fields are required" })
            return;
        }

        const userExist = await userModel.findOne(email)
        if (userExist) {
            res.status(200).json({ message: "User Already registered" })
            return;
        }

        const hasshedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            firstName,
            lastName,
            email,
            password: hasshedPassword
        })
        console.log(`👋 ${email} is 🎉 signup at at ${new Date}`)

        res.status(201).json({ message: "Account Created", userId: user._id })

    } catch (error) {
        res.status(401).json({ message: "Something Went wrong", error })
    }

})


//Account Signin
userRoutes.post("/signin", async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const gettingUser = await userModel.findOne({ email })
        if (!gettingUser) {
            res.status(404).json({ "message": "User Not Found" })
        }

        const userVerified = await bcrypt.compare(password, gettingUser?.password as string)
        if (!userVerified) {
            res.status(401).json({ message: "Invalid Credentials" })
            return
        }
        const userToken = jwt.sign({ userId: gettingUser?._id.toString() }, JWT_SECRET as string, { expiresIn: "3d" })
        res.status(200).json({ message: "User Found", accessToken: userToken })
        console.log(`👋 ${email.split("@")[0]} is sign in`)


    } catch (error) {
        res.status(401).json({ message: "Something Went wrong", error })
    }

})


// Email Update
userRoutes.put("/update-email", userMiddleware, async (req: Request, res: Response) => {
    const { newEmail } = req.body
    //@ts-ignore
    const userId = req.userId
    const gettingUser = await userModel.findById(userId)
    if (!gettingUser) {
        res.status(400).json({ message: "user id not found" })
        return
    }
    try {
        const updateEmail = await userModel.findByIdAndUpdate(userId, { email: newEmail })
        res.status(200).json({ message: "Email updated" })
    } catch (error) {

        res.status(400).json({ message: "Something went wrong", error: error })
    }


})


// User FirstName Update
userRoutes.put("/update-firstName", userMiddleware, async (req: Request, res: Response) => {
    const { newFirstName } = req.body
    //@ts-ignore
    const userId = req.userId
    const gettingUser = await userModel.findById(userId)
    if (!gettingUser) {
        res.status(400).json({ message: "user id not found" })
        return
    }
    try {
        const updateFirstName = await userModel.findByIdAndUpdate(userId, { firstName: newFirstName })
        res.status(200).json({ message: "First Name updated", newFirstName: newFirstName })
        console.log(`👋 ${updateFirstName?.firstName} changes first name to ${newFirstName}`)
    } catch (error) {

        res.status(400).json({ message: "Something went wrong", error: error })
    }


})


// User LastName Update
userRoutes.put("/update-lastName", userMiddleware, async (req: Request, res: Response) => {
    const { newLastName } = req.body
    //@ts-ignore
    const userId = req.userId
    const gettingUser = await userModel.findById(userId)
    if (!gettingUser) {
        res.status(400).json({ message: "user id not found" })
        return
    }
    try {
        const updateLastName = await userModel.findByIdAndUpdate(userId, { lastName: newLastName })
        res.status(200).json({ message: "First Name updated", newLastName: newLastName })
        console.log(`👋 ${updateLastName?.firstName} changes last name to ${newLastName}`)
    } catch (error) {

        res.status(400).json({ message: "Something went wrong", error: error })
    }


})

// User Password Update
userRoutes.put("/update-password", userMiddleware, async (req: Request, res: Response) => {
    const { newPassword } = req.body
    //@ts-ignore
    const userId = req.userId
    const gettingUser = await userModel.findById(userId)
    if (!gettingUser) {
        res.status(400).json({ message: "user id not found" })
        return
    }
    const hasshedPassword = await bcrypt.hash(newPassword, 10)

    try {
        const updatePassword = await userModel.findByIdAndUpdate(userId, { password: hasshedPassword })
        res.status(200).json({ message: "Password Updated" })
        console.log(`👋 ${updatePassword?.firstName} changes password`)
    } catch (error) {
        res.status(400).json({ message: "Something went wrong", error: error })
    }


})




export { userRoutes }

