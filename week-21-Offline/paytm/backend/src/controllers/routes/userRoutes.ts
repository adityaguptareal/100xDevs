import { Router, Request, Response } from "express"
import { userModel } from "../../models/userdb"
import { file, z } from "zod"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userMiddleware from "../middleware/usermiddleware"
const userRoutes = Router()
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET

// Account Signup
userRoutes.post("/signup", async (req: Request, res: Response) => {
    const signupSchema = z.object({
        email: z.string().email(),
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

        const userExist = await userModel.findOne({ email })
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

userRoutes.put("/update-profile", userMiddleware, async (req: Request, res: Response) => {
    //@ts-ignore
    const userId = req.userId;
    const { email, firstName, lastName, password } = req.body;

    try {
        const gettingUser = await userModel.findById(userId);
        if (!gettingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const updateData: any = {};
        if (email) updateData.email = email;
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });
        res.status(200).json({
            message: "Profile updated successfully",
            updatedUser: {
                email: updatedUser?.email,
                firstName: updatedUser?.firstName,
                lastName: updatedUser?.lastName
            }
        });

        console.log(`👋 ${gettingUser.firstName} updated profile details`);

    } catch (error) {
        res.status(400).json({ message: "Something went wrong", error });
    }
});

userRoutes.get("/bulk", async (req, res) => {
    try {
        const query = req.query.filter
        if (!query) {
            const users = await userModel.find({})
            res.status(200).json({ allUsers: users })
        }
        const users = await userModel.find({
            $or: [
                {
                    firstName: { $regex: query, $options: "i" }
                },
                {
                    lastName: { $regex: query, $options: "i" }
                }
            ]
        })
        res.status(200).json({
            status: "Success", usrers: users
        })
    } catch (error) {
        
        res.status(400).json({ status: "error", message: error })
    }
})




export { userRoutes }

