import { Request, Response } from "express";
import { User } from "../../entities/User";
import { createUserService } from "../../services";
import { handleError } from "../../utils";

const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.validated as User);
    return res.status(201).json(user);
  } catch (error: any) {
    return handleError(error, res);
  }
};

export default createUserController;
