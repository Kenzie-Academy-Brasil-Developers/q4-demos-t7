import { Request, Response } from 'express';
import { UserRepository } from '../repositories';

const updateUserController = async (req: Request, res: Response) => {
  const updResult = await new UserRepository().update(req.params.id, req.body);

  return res.status(200).json(updResult);
};

export default updateUserController;
