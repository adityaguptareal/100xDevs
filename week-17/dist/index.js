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
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const pgClients = new pg_1.Client("postgresql://neondb_owner:npg_b9xqAklcX8js@ep-white-cell-a1q5cnve-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require");
pgClients.connect();
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send("Hello World!");
});
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, city, country, street, pincode } = req.body;
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
        const responseUserQuery = yield pgClients.query(insertUserQuery, [username, email, password]);
        const user_id = responseUserQuery.rows[0].id;
        console.log("user created");
        const addressUserQuery = `INSERT INTO addresses(city,country,street,pincode,user_id) VALUES ($1,$2,$3,$4,$5) `;
        const responseAddressQuery = yield pgClients.query(addressUserQuery, [city, country, street, pincode, user_id]);
        // await pgClients.query("COMMIT");
        res.status(200).json({
            status: "success",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failed",
        });
    }
}));
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.user_id;
        const UserQuery = `SELECT * from users WHERE id=$1`;
        const responseUserQuery = yield pgClients.query(UserQuery, [userId]);
        const addressQuert = `SELECT city,country,pincode from addresses WHERE user_id=$1`;
        const responseAddressQuery = yield pgClients.query(addressQuert, [userId]);
        res.status(200).json({
            status: "success",
            userData: responseUserQuery.rows[0],
            addressData: responseAddressQuery.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({
            status: "failed",
            error: (error === null || error === void 0 ? void 0 : error.message) || "Internal Server Error"
        });
        console.log(error);
    }
}));
app.get("/v1/users/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.user_id;
        const UserQuery = `SELECT users.id,users.username,users.email,addresses.city,addresses.street FROM users FULL JOIN addresses ON users.id=addresses.user_id WHERE users.id=$1`;
        const responseUserQuery = yield pgClients.query(UserQuery, [userId]);
        res.status(200).json({
            status: "success",
            userData: responseUserQuery.rows[0]
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failed",
            error: (error === null || error === void 0 ? void 0 : error.message) || "Internal Server Error"
        });
    }
}));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
