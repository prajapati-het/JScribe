import express from 'express';
import { saveCode } from '../controllers/complierController';

export const compileRouter = express.Router()
compileRouter.post("/save",saveCode)