import { Request, Response } from 'express';
import { USERS } from '../configs';

const deleteUserController = (req: Request, res: Response): Response => {
  const userIndex: number = USERS.indexOf(req.user);
  USERS.splice(userIndex, 1);

  return res.status(200).json({ user: req.user });
};

export default deleteUserController;
