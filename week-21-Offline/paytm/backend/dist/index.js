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
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = require("./controllers/routes/userRoutes");
const accountRoutes_1 = require("./controllers/routes/accountRoutes");
const app = (0, express_1.default)();
require("dotenv").config();
const port = process.env.PORT;
const db_URL = process.env.MONGODB_URl;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/user", userRoutes_1.userRoutes);
app.use("/api/v1/accounts", accountRoutes_1.accountRoutes);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(db_URL);
            console.log("database connected successfully");
        }
        catch (error) {
            console.log("Geeting Error", error);
        }
    });
}
main();
app.get("/", (req, res) => {
    res.send("Hello Aditya");
});
app.listen(port, () => {
    console.log("App is Running at port", port);
});
