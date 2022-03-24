import { Request, Response } from 'express';

const retrieveUserByIdController = (req: Request, res: Response): Response => {
  const { user } = req;

  return res.status(200).json(user);
};

export default retrieveUserByIdController;
