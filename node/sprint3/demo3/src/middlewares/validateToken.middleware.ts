import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import User from '../entities/User';
import jwtConfig from '../jwtConfig';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'missing authorization header' });
  }

  return verify(token, jwtConfig.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: err });
    }

    req.decoded = decoded as Partial<User>;
    return next();
  });
};

export default validateToken;
