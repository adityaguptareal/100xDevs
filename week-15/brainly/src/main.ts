import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { z } from "zod";
import { userModel } from "./models/db";
import { jwt_Secret,} from './config/credenitals';
import { userMiddleware } from './middlewares/userAuthenticationMiddleware';


const app = express();
app.use(express.json())
const port = 3000



app.get("/api/v1/", (req, res) => {
    res.send("Api is working properly")
})

app.post("/api/v1/signup", async (req, res) => {
    try {

        const userData = z.object({
            username: z.string().min(1, { message: "Username is required" }),
            password: z.string().min(1, { message: "Password is required" }),
            email: z.string().email({ message: "Email is required" }),
        })
        const validateData = userData.safeParse(req.body)
        if (!validateData.success) {
            res.status(400).send(validateData.error)
            return
        }
    } catch (error) {
        res.status(500).send("Error in validation" + error)
        return

    }
    const userName = req.body.username
    const password = req.body.password
    const email = req.body.email

    if (!userName || !password || !email) {
        res.send("All fileds are required")
        return
    }
    const hashedPassword = await bcrypt.hash(password, 8)

    try {
        await userModel.create({
            username: userName,
            password: hashedPassword,
            email: email
        })

        res.status(200).json({ message: "User created successfully", data: { username: userName, email: email } })

    } catch (error) {
        res.status(404).json({ message: "Error while creating user", error: error })
        return
    }

})
app.post("/api/v1/signin", async (req, res) => {
    try {
        const userCredentials = z.object({
            email: z.string().min(4).email({ message: "Email is required" }),
            password: z.string().min(2, { message: "Password is required" })
        })
        const validateUserCredentials = userCredentials.safeParse(req.body)
        if (!validateUserCredentials.success) {
            res.status(411).json({ message: "Error while signin", error: validateUserCredentials.error })
            return
        }
        const { email, password } = validateUserCredentials.data
        const gettingUser = await userModel.findOne({
            email: email
        })
        if (!gettingUser) {
            res.status(404).json({ message: "User is not registered" })
            return
        }
        //@ts-ignore
        const decryptPassword = await bcrypt.compare(password, gettingUser.password)
        if (decryptPassword) {
            const token = jwt.sign({
                id: gettingUser._id
            }, jwt_Secret)

            res.status(200).json({ message: "user signed in successfully", token: token })
        }
        else {
            res.status(411).json({ message: "invalid credentials" })
        }

    } catch (error) {
        res.status(404).json({ message: "Someting went wrong", error: error })
        return
    }

})
app.post("/api/v1/content",userMiddleware, (req, res) => {
    // const token=req.
    res.status(200).json({ message: "you are authorised" })
})
app.get("/api/v1/content", (req, res) => {

})
app.delete("/api/v1/content", (req, res) => {

})
app.post("/api/v1/brain/share", (req, res) => {

})
app.get("/api/v1/brain/:shareLink", (req, res) => {

})


async function main() {
    try {
let dbConnectionString="mongodb+srv://adityaguptareal:dbadityaguptareal@cluster0.3rcjj.mongodb.net/brainly"
        let connect = await mongoose.connect(dbConnectionString)
        console.log("Db Successfully connected")
    } catch (error) {
        console.log("error while connecting", error)
        
    };


    app.listen(port, () => {
        console.log("App is running at port", port)
    })
}

main()