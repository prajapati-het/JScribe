import express from "express";
import { signup, login, logout, userDetails, googleSignIn } from "../controllers/userController";
import { verifyToken } from "../middlewares/verifyToken";
import { getMyCodes } from "../controllers/compilerController";
export const UserAuthRouter = express.Router();

UserAuthRouter.post("/signup", signup);
UserAuthRouter.post("/login", login);
UserAuthRouter.post("/logout", logout);
UserAuthRouter.get("/user-details", verifyToken, userDetails);
UserAuthRouter.get("/my-codes", verifyToken, getMyCodes);
UserAuthRouter.post("/user/googleSignin",googleSignIn);