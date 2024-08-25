const express = require("express");
import { signup, login, logout } from "../controllers/userController";
export const UserAuthRouter = express.Router();

UserAuthRouter.post("/signup", signup);
UserAuthRouter.post("/login", login);
UserAuthRouter.post("/logout", logout);
