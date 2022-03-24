import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { config } from '../configs';

const validateAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ massage: 'missing authorization' });
  }

  jsonwebtoken.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: err });
    }

    req.email = decoded as string;
    return next();
  });
};

export default validateAuth;
