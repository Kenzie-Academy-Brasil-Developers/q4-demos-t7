import { Request, Response } from 'express';
import { UserRepository } from '../repositories';

const deleteUserController = async (req: Request, res: Response) => {
  const dltResult = await new UserRepository().delete(req.params.id);

  return res.status(200).json(dltResult);
};

export default deleteUserController;
