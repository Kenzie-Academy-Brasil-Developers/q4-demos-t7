import { Request, Response } from 'express';
import { UserRepository } from '../repositories';

const createUserController = async (req: Request, res: Response) => {
  const user = await new UserRepository().save(req.body);

  return res.status(201).json(user);
};

export default createUserController;
