import {PrismaClient} from "@prisma/client"
// import { PrismaClient } from "./generated/prisma"
const client = new PrismaClient()

async function main() {


// Inserting Enteries 


    // await client.users.create({
    //     data: {
    //         email: "adityagupcxcsdtapro@gmail.com",
    //         age: 23,
    //         city: "Noidacsdc",
    //         password: "Ak184cds0319@",
    //     }
    // })



    // Deleting Entries


    //  await client.users.delete({
    //     where: {
    //         id: 2
    //     }
    // })



// updating the records


    // await client.users.update({
    //     where: {
    //         email:"adityaguptapro@gmail.com"
    //     },
    //     data:{
    //         email:"adityakumargupta@gmail.com"
    //     }
    // })



// Counting Records in the  


//  const users=await client.users.count()
//  console.log(users)   
}
main()