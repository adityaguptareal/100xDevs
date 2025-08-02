import { Router } from "express";
const accountRoutes=Router()

accountRoutes.get("/",(req,res)=>{
    res.send("Account Routes work properly")
})
accountRoutes.get("/balance",(req,res)=>{
    res.send("Balance Routes work properly")
})

export {accountRoutes}