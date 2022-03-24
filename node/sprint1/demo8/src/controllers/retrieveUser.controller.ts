import { Request, Response } from 'express';

const retrieveUserController = (req: Request, res: Response): Response => {
  const { paginated } = req;
  return res.status(200).json(paginated);
};

export default retrieveUserController;
