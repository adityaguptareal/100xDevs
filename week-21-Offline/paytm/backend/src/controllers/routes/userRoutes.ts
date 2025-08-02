import { Router, Request, Response } from "express"
export const userRoutes = Router()
import { userModel } from "../../models/userdb"

userRoutes.post("/signup", async (req: Request, res: Response) => {
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
