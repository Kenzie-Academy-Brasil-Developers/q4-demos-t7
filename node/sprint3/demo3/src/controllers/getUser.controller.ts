import { Request, Response } from 'express';
import { UserRepository } from '../repositories';

const getUserController = async (req: Request, res: Response) => {
  const users = await new UserRepository().find();

  return res.status(200).json({ users });
};

export default getUserController;
