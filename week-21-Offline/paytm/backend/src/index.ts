import mongoose from "mongoose";
import express from "express"
import {userRoutes} from "./controllers/routes/userRoutes"

const app = express()
require("dotenv").config()
const port = process.env.PORT
const db_URL = process.env.MONGODB_URl
app.use(express.json())
app.use("/api/v1/user",userRoutes)


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


app.listen(port, () => {
    console.log("App is Running at port", port)
})