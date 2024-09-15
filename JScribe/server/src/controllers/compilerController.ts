import { Request, Response } from "express";
import { Code } from "../models/Code";
import { fullCodeType } from "../types/compilerTypes";

export const saveCode = async (req: Request, res: Response) => {
  console.log("Inside compiler Controller : ",req.body);
  const fullCode: fullCodeType = req.body;
  if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
    return res.status(400).send({ message: "Code cannot be blank!" });
  }
  try {
    const newCode = await Code.create({
      fullCode: fullCode,
    });
    return res.status(201).send({ url: newCode._id, status: "saved!" });
  } catch (error) {
    res.status(500).send({ message: "Error saving code", error });
  }
};

export const loadCode = async (req: Request, res: Response) => {
  const { urlId } = req.body;
  try {
    const existingCode = await Code.findById(urlId);
    console.log(existingCode?.fullCode);
    if (!existingCode) {
      return res.status(404).send({ message: "Code not found" });
    }
    return res.status(200).send({ fullCode: existingCode.fullCode });
  } catch (error) {
    return res.status(500).send({ message: "Error loading code", error });
  }
};
