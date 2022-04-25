import { Request, Response, NextFunction } from 'express';
import User from '../entities/User';
import { UserRepository } from '../repositories';

const findUser = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = await new UserRepository().findOneBy({
    email: req.body.email,
  });

  if (!user) {
    return res.status(404).json({ message: 'invalid credentials' });
  }

  if (req.body.password !== user.password) {
    return res.status(404).json({ message: 'invalid credentials' });
  }

  req.userDb = user;

  return next();
};

export default findUser;
