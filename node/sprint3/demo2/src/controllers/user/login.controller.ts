import { Request, Response } from "express";

const loginUserController = (req: Request, res: Response) => {
  return res.status(200).json({ token: req.token });
};

export default loginUserController
