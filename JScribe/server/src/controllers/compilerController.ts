import { Request, Response } from "express";
export const saveCode = (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).send({ message: "Error saving code", error });
  }
};
