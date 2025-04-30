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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const db_1 = require("./models/db");
const credenitals_1 = require("./config/credenitals");
const userAuthenticationMiddleware_1 = require("./middlewares/userAuthenticationMiddleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
app.get("/api/v1/", (req, res) => {
    res.send("Api is working properly");
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = zod_1.z.object({
            username: zod_1.z.string().min(1, { message: "Username is required" }),
            password: zod_1.z.string().min(1, { message: "Password is required" }),
            email: zod_1.z.string().email({ message: "Email is required" }),
        });
        const validateData = userData.safeParse(req.body);
        if (!validateData.success) {
            res.status(400).send(validateData.error);
            return;
        }
    }
    catch (error) {
        res.status(500).send("Error in validation" + error);
        return;
    }
    const userName = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    if (!userName || !password || !email) {
        res.send("All fileds are required");
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 8);
    try {
        yield db_1.userModel.create({
            username: userName,
            password: hashedPassword,
            email: email
        });
        res.status(200).json({ message: "User created successfully", data: { username: userName, email: email } });
    }
    catch (error) {
        res.status(404).json({ message: "Error while creating user", error: error });
        return;
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCredentials = zod_1.z.object({
            email: zod_1.z.string().min(4).email({ message: "Email is required" }),
            password: zod_1.z.string().min(2, { message: "Password is required" })
        });
        const validateUserCredentials = userCredentials.safeParse(req.body);
        if (!validateUserCredentials.success) {
            res.status(411).json({ message: "Error while signin", error: validateUserCredentials.error });
            return;
        }
        const { email, password } = validateUserCredentials.data;
        const gettingUser = yield db_1.userModel.findOne({
            email: email
        });
        if (!gettingUser) {
            res.status(404).json({ message: "User is not registered" });
            return;
        }
        //@ts-ignore
        const decryptPassword = yield bcrypt_1.default.compare(password, gettingUser.password);
        if (decryptPassword) {
            const token = jsonwebtoken_1.default.sign({
                id: gettingUser._id
            }, credenitals_1.jwt_Secret);
            res.status(200).json({ message: "user signed in successfully", token: token });
        }
        else {
            res.status(411).json({ message: "invalid credentials" });
        }
    }
    catch (error) {
        res.status(404).json({ message: "Someting went wrong", error: error });
        return;
    }
}));
app.post("/api/v1/content", userAuthenticationMiddleware_1.userMiddleware, (req, res) => {
    // const token=req.
    res.status(200).json({ message: "you are authorised" });
});
app.get("/api/v1/content", (req, res) => {
});
app.delete("/api/v1/content", (req, res) => {
});
app.post("/api/v1/brain/share", (req, res) => {
});
app.get("/api/v1/brain/:shareLink", (req, res) => {
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let dbConnectionString = "mongodb+srv://adityaguptareal:dbadityaguptareal@cluster0.3rcjj.mongodb.net/brainly";
            let connect = yield mongoose_1.default.connect(dbConnectionString);
            console.log("Db Successfully connected");
        }
        catch (error) {
            console.log("error while connecting", error);
        }
        ;
        app.listen(port, () => {
            console.log("App is running at port", port);
        });
    });
}
main();
