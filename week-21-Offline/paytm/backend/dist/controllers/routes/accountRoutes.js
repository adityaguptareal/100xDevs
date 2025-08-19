"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRoutes = void 0;
const express_1 = require("express");
const accountRoutes = (0, express_1.Router)();
exports.accountRoutes = accountRoutes;
accountRoutes.get("/", (req, res) => {
    res.send("Account Routes work properly");
});
accountRoutes.get("/balance", (req, res) => {
    res.send("Balance Routes work properly");
});
