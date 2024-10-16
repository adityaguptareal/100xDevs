const express=require("express")
const app=express()
const {userRoutes}=require("./routes/userRoutes")
const {courseRoutes}=require("./routes/coursesRoutes")
const {adminRoutes}=require("./routes/adminRoutes")
const mongoose=require("mongoose")
app.use(express.json())

const port=3000

// Version 1 api
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/courses",courseRoutes)
app.use("/api/v1/admin",adminRoutes)

async function main() {
  try {
    await mongoose.connect("mongodb+srv://adityaguptareal:LK9dhOMRR2Zyy4hc@cluster0.3rcjj.mongodb.net/CodePedia")
 } catch (error) {
     console.log(error);
     
 }
 
 app.listen(port,()=>{
     console.log('App is running at', port);
     
 })
}
main()