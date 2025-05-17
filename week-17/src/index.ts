import { Client } from "pg";
import express from "express"
const app = express()
const port = 3000
const pgClients = new Client("postgresql://neondb_owner:npg_b9xqAklcX8js@ep-white-cell-a1q5cnve-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require")

pgClients.connect()
app.use(express.json())
app.post("/signup", (req, res) => {
    const { username, email, password } = req.body

    // Another Way
    // const pgClients = new Client({
    //     user: "neondb_owner",
    //     password: "npg_b9xqAklcX8js",
    //     port: 5432,
    //     host: "ep-white-cell-a1q5cnve-pooler.ap-southeast-1.aws.neon.tech",
    //     database: "neondb"
    // })


    // const response= await pgClients.query("SELECT * FROM Users")
    // const response= await pgClients.query("UPDATE users SET password='Ak9955594@' WHERE email='adityaguptapro@gmail.com'")


    // Can cause SQL Injection Problem
    // const insertQuery = `INSERT INTO users (username,email,password) VALUES (${username},{$email},${password})`;
    try {
        const insertQuery = `INSERT INTO users (username,email,password) VALUES ($1,$2,$3)`;
        const responseQuery = pgClients.query(insertQuery, [username, email, password])
        console.log(responseQuery)
    } catch (error) {
        console.log(error)
    }

})



