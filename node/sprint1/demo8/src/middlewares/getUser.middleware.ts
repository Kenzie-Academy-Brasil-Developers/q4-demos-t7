import { NextFunction, Request, Response } from 'express';
import { User, USERS } from '../configs';
const getUser = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  // req = { params: { uuid: "" } }
  const { uuid } = req.params;
  const user: User | undefined = USERS.find((u) => u.uuid === uuid);

  if (!user) {
    return res.status(404).json({ message: 'user not found!' });
  }

  req.user = user

  return next();
};

export default getUser;
