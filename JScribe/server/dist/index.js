"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const dbConnect_1 = require("./lib/dbConnect");
const compilerRouter_1 = require("./routes/compilerRouter");
const UserAuthRouter_1 = require("./routes/UserAuthRouter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const User_1 = require("./models/User");
const firebase_1 = require("./firebase");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ credentials: true, origin: "http://localhost:5173" }));
(0, dotenv_1.config)();
app.use("/compiler", compilerRouter_1.compilerRouter);
app.use("/user", UserAuthRouter_1.UserAuthRouter);
app.post("/api/protected", verifyTokengoogle, async (req, res) => {
    const { uid, name, email, picture } = req.body;
    let user = await User_1.User.findOne({ uid });
    if (!user) {
        user = new User_1.User({ uid, name, email, picture });
        await user.save();
    }
    res.send(user);
});
async function verifyTokengoogle(req, res, next) {
    const idToken = req.headers.authorization;
    if (!idToken) {
        return res.status(401).send("Unauthorized");
    }
    try {
        const decodedToken = await firebase_1.admin.auth().verifyIdToken(idToken);
        req.body = decodedToken;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).send("Unauthorized");
    }
}
(0, dbConnect_1.dbConnect)();
app.listen(4000, () => {
    console.log("http://localhost:4000");
});
