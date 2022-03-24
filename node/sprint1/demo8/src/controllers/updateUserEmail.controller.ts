import { Request, Response } from 'express';

const updateUserEmailController = (req: Request, res: Response): Response => {
  const { email } = req.validated;
  const { user } = req;

  user.email = email;

  return res.status(200).json(user);
};

export default updateUserEmailController;
