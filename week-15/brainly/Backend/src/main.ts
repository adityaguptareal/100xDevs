import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { z } from "zod";
import { v4 as uuid } from 'uuid';
import { contentModel, LinkModel, userModel } from "./models/db";
import { jwt_Secret, } from './config/credenitals';
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


// Route for adding content
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const token = req.userid
    try {
        const contentValidation = z.object({
            link: z.string().min(3, { message: "link is required" }),
            title: z.string().min(3, { message: "Title is required" }),
        })
        const parseContent = contentValidation.safeParse(req.body)
        if (!parseContent.success) {
            res.status(400).json({ message: "Something went wrong", error: parseContent.error })
            return
        }

        let { title, type, link } = req.body

        const createContent = await contentModel.create({
            title,
            link,
            type,
            userId: token,
            tags: []

        })

        res.status(200).json({ message: "Contented added", content: createContent })
    } catch (error) {
        res.status(411).json({ message: "Something went wroong", error: error })
    }

})
app.get("/api/v1/content", userMiddleware, async (req, res) => {
    try {
        //@ts-ignore
        const token = req.userid
        const gettingContent = await contentModel.find({
            userId: token
        }).populate("userId", 'username email ')

        res.status(200).json({ conetents: gettingContent })
    } catch (error) {
        res.status(411).json({ error: error })

    }

})
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const token = req.userid
    const contentId = req.body.contentId
    try {
        let content = await contentModel.findById(contentId)
        //@ts-ignore
        const { title } = content
        let deltetingRecords = await contentModel.deleteMany({
            userId: token, _id: contentId
        })

        res.status(200).json({ message: "Your content is deleted", title: title, id: contentId })
    } catch (error) {
        res.status(411).json({ message: "Something went wrong", error: error })

    }

})
app.post("/api/v1/brain/share", userMiddleware, async (req: any, res) => {
    try {
        const hash = uuid()
        const { share } = req.body
        if (!share) {
            res.status(400).json({ message: "Can't be share" })
            return
        }

        const checkLink = await LinkModel.find({ userId: req.userid })
        console.log(checkLink)
        if (checkLink.length > 0) {
            res.status(200).json({ message: "link already generated", sharelink: checkLink[0].hash })
        } else {
            const shareLink = await LinkModel.create({
                //@ts-ignore
                userId: req.userid,
                hash: hash
            })
            console.log(shareLink)
            res.status(200).json({ message: "share link generated", link: shareLink.hash })
            
        }

    } catch (error) {
        res.status(411).json({ message: "something went wrong", error: error })
    }


})
app.get("/api/v1/brain/:shareLink", async (req, res) => {

    try {
        const hashedLink = req.params.shareLink
        if (!hashedLink) {
            res.status(400).json({ message: "Please check you link" })
            return
        }
        const gettingUserId = await LinkModel.find({ hash: hashedLink })
        if (!gettingUserId) {
            res.status(400).json({ message: "link is not valid" })
            return
        }
        const gettingContent = await contentModel.find({ userId: gettingUserId[0].userId })
        const user= await userModel.findById(gettingUserId[0].userId)
    
        res.status(200).json({ content: gettingContent,user:user?.email })

    } catch (error) {
        res.status(411).json({ message: "Some thing went wrong", error: error })
        return
    }

})


async function main() {
    try {
        let dbConnectionString = "mongodb+srv://adityaguptareal:dbadityaguptareal@cluster0.3rcjj.mongodb.net/brainly"
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