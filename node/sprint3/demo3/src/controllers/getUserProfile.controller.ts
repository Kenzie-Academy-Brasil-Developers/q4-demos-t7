import { Request, Response } from 'express';
import { UserRepository } from '../repositories';

const getUserProfileController = async (req: Request, res: Response) => {
  const decodedUser = req.decoded;
  const user = await new UserRepository().findOneBy({
    email: decodedUser.email,
  });

  return res.status(200).json(user);
};

export default getUserProfileController;
