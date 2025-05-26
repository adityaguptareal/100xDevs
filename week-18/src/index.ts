import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();


async function createUser() {
    
    client.user.create({
        data:{
            username:"adityaguptareal",
            password:"Ak1840319",
            age:18,
            city:"greater noida"
        }
    })
}

createUser()