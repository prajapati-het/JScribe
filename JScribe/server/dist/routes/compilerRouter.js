"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilerRouter = void 0;
const express_1 = __importDefault(require("express"));
const compilerController_1 = require("../controllers/compilerController");
const verifyToken_1 = require("../middlewares/verifyToken");
const verifyTokenanonymous_1 = require("../middlewares/verifyTokenanonymous");
exports.compilerRouter = express_1.default.Router();
exports.compilerRouter.post("/save", verifyTokenanonymous_1.verifyTokenAnonymous, compilerController_1.saveCode);
exports.compilerRouter.post("/load", verifyTokenanonymous_1.verifyTokenAnonymous, compilerController_1.loadCode);
exports.compilerRouter.delete("/delete/:id", verifyToken_1.verifyToken, compilerController_1.deleteCode);
exports.compilerRouter.put("/edit/:id", verifyToken_1.verifyToken, compilerController_1.editCode);
exports.compilerRouter.get("/get-all-codes", compilerController_1.getAllCodes);
