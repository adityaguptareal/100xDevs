import { Router, Request, Response } from "express"
import userMiddleware from "../middleware/usermiddleware";
import { accountModel, userModel } from "../../models/userdb";

const accountRoutes = Router()

accountRoutes.get("/", (req, res) => {
    res.send("Account Routes work properly")
})

accountRoutes.get("/balance", userMiddleware, async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const checkAccount = await userModel.findById(req.userId)
        if (!checkAccount) {
            res.status(400).json({ message: "User Does not Exist" })
        }

        // @ts-ignore
        const account = await accountModel.findOne({
            // @ts-ignore
            userid: req.userId
        })

        res.json({ accountBalance: account?.balance || 0 })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Something went wrong" })
    }
})

export { accountRoutes }
