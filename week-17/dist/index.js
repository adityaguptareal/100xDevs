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
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pgClients = new pg_1.Client("postgresql://neondb_owner:npg_b9xqAklcX8js@ep-white-cell-a1q5cnve-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require");
// Another Way
// const pgClients = new Client({
//     user: "neondb_owner",
//     password: "npg_b9xqAklcX8js",
//     port: 5432,
//     host: "ep-white-cell-a1q5cnve-pooler.ap-southeast-1.aws.neon.tech",
//     database: "neondb"
// })
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield pgClients.connect();
        // const response= await pgClients.query("SELECT * FROM Users")
        const response = yield pgClients.query("UPDATE users SET password='Ak9955594@' WHERE email='adityaguptapro@gmailcom'");
        console.log(response.rows);
    });
}
main();
