"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const verifyToken_1 = require("../middlewares/verifyToken");
const compilerController_1 = require("../controllers/compilerController");
exports.UserAuthRouter = express_1.default.Router();
exports.UserAuthRouter.post("/signup", userController_1.signup);
exports.UserAuthRouter.post("/login", userController_1.login);
exports.UserAuthRouter.post("/logout", userController_1.logout);
exports.UserAuthRouter.get("/user-details", verifyToken_1.verifyToken, userController_1.userDetails);
exports.UserAuthRouter.get("/my-codes", verifyToken_1.verifyToken, compilerController_1.getMyCodes);
exports.UserAuthRouter.post("/user/googleSignin", userController_1.googleSignIn);
