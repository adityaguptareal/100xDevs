"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./generated/prisma");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const client = new prisma_1.PrismaClient();
app.get("/", (req, res) => {
    res.status(200).json({ "message": "Hello World" });
});
app.get("/user/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const userTodo = yield client.todo.findMany({
        where: {
            userId: Number(id)
        }
    });
    res.status(200).json({ todos: userTodo });
}));
app.listen(port, () => {
    console.log("App is running at", port);
});
// async function main() {
//     // Inserting Enteries 
// await client.users.create({
//     data: {
//         email: "adityagupcxcsdtapro@gmail.com",
//         age: 23,
//         city: "Noidacsdc",
//         password: "Ak184cds0319@",
//     }
// })
//     // Deleting Entries
//     //  await client.users.delete({
//     //     where: {
//     //         id: 2
//     //     }
//     // })
// updating the records
// await client.users.update({
//     where: {
//         email:"adityaguptapro@gmail.com"
//     },
//     data:{
//         email:"adityakumargupta@gmail.com"
//     }
// })
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
