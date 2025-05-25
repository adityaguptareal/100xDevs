import { Client } from "pg";
import express from "express"
const app = express()
const port = 3000
const pgClients = new Client("postgresql://neondb_owner:npg_b9xqAklcX8js@ep-white-cell-a1q5cnve-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require")


pgClients.connect()
app.use(express.json())
app.get("/", (_req, res) => {
    res.send("Hello World!")
})



app.post("/signup", async (req, res) => {
    const { username, email, password, city, country, street, pincode } = req.body

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
        // await pgClients.query("BEGIN");
        const insertUserQuery = `INSERT INTO users(username,email,password) VALUES ($1,$2,$3) RETURNING id `;
        const responseUserQuery = await pgClients.query(insertUserQuery, [username, email, password]);
        const user_id = responseUserQuery.rows[0].id
        console.log("user created")
        const addressUserQuery = `INSERT INTO addresses(city,country,street,pincode,user_id) VALUES ($1,$2,$3,$4,$5) `;
        const responseAddressQuery = await pgClients.query(addressUserQuery, [city, country, street, pincode, user_id])


        // await pgClients.query("COMMIT");
        res.status(200).json({
            status: "success",
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "failed",
        })
    }

})

app.get("/users", async (req, res) => {
    try {
        const userId = req.query.user_id
        const UserQuery = `SELECT * from users WHERE id=$1`
        const responseUserQuery = await pgClients.query(UserQuery, [userId])
        const addressQuert= `SELECT city,country,pincode from addresses WHERE user_id=$1`
        const responseAddressQuery = await pgClients.query(addressQuert, [userId])
        res.status(200).json({
            status: "success",
            userData: responseUserQuery.rows[0],
            addressData: responseAddressQuery.rows[0]

        });
    } catch (error: any) {
        res.status(500).json({
            status: "failed",
            error: error?.message || "Internal Server Error"
        })
        console.log(error)
    }
})

app.get("/v1/users/", async (req, res) => {
    try {
        const userId = req.query.user_id
        const UserQuery = `SELECT users.id,users.username,users.email,addresses.city,addresses.street FROM users FULL JOIN addresses ON users.id=addresses.user_id WHERE users.id=$1`
        const responseUserQuery = await pgClients.query(UserQuery, [userId])
        res.status(200).json({
            status: "success",
            userData: responseUserQuery.rows[0]
        });
    } catch (error:any) {
        console.log(error)
        res.status(500).json({
            status: "failed",
            error: error?.message || "Internal Server Error"
        })
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})