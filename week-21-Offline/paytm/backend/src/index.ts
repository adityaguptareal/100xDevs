import mongoose from "mongoose";
import express from "express"
const {userModel} = require("./models/userdb")
const app = express()
require("dotenv").config()
const port = process.env.PORT
const db_URL = process.env.MONGODB_URl
app.use(express.json())


async function main() {
    try {
        await mongoose.connect(db_URL as string)
        console.log("database connected successfully")
    } catch (error) {
        console.log("Geeting Error", error)
    }
}

main()

app.get("/", (req, res) => {
    res.send("Hello Aditya")
})

app.post("/create-user", async (req, res) => {
//@ts-ignore
    const { username, email, password } = req.body
     console.log({
            username,
            email,
            password
        })
    try {
        const user = await userModel.create({
            username,
            email,
            password
        })
       
        res.send("userCreated Succefully")
        console.log(user)
    } catch (error) {
        res.send(`Getting Error : ${error}`)
        console.log(error)
    }

})

app.listen(port, () => {
    console.log("App is Running at port", port)
})