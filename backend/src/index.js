"use strict";
// console.log("hello Sunshine");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3500;
app.get("/", (req, res) => {
    res.send("Hello Sunshine!");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
