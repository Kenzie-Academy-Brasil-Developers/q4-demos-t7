import { NextFunction, Request, Response } from 'express';

const verifyUserPermission = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { user, email } = req;

  if (user.email !== email) {
    return res.status(401).json({ error: 'unauthorazed' });
  }

  return next();
};

export default verifyUserPermission;
