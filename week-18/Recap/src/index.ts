import { PrismaClient } from "./generated/prisma"
import express from "express"

const app = express()
const port = 3000
const client = new PrismaClient()


app.get("/", (req, res) => {
    res.status(200).json({ "message": "Hello World" });
})

app.get("/user/todos/:id", async (req, res) => {
    const id = req.params.id
    const userTodo = await client.todo.findMany({
        where: {
            userId: Number(id)
        }
    })
    res.status(200).json({ todos: userTodo })
})

app.listen(port, () => {
    console.log("App is running at", port)
})


// async function main() {


//     // Inserting Enteries 


//     // await client.users.create({
//     //     data: {
//     //         email: "adityagupcxcsdtapro@gmail.com",
//     //         age: 23,
//     //         city: "Noidacsdc",
//     //         password: "Ak184cds0319@",
//     //     }
//     // })



//     // Deleting Entries


//     //  await client.users.delete({
//     //     where: {
//     //         id: 2
//     //     }
//     // })



//     // updating the records


//     // await client.users.update({
//     //     where: {
//     //         email:"adityaguptapro@gmail.com"
//     //     },
//     //     data:{
//     //         email:"adityakumargupta@gmail.com"
//     //     }
//     // })



//     // Counting Records in the  


//     //  const users=await client.users.count()
//     //  console.log(users)  







//     // await client.todo.create({
//     //     data: {
//     //         title: "Test todo",
//     //         description: "This is test data",
//     //         done: false,
//     //         time: new Date,
//     //         userId:1
//     //     }
//     // })



//     // getting data by referenceing



//     const userTodo = await client.users.findFirst({
//         where: {
//             id: 1
//         },
//         select: {
//             todo: true
//         }
//     })



//     console.log(userTodo)


// }
// main()