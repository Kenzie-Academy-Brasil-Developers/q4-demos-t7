import { Request, Response, NextFunction } from 'express';
import { sign } from 'jsonwebtoken';
import jwtConfig from '../jwtConfig';

const authToken = (req: Request, _: Response, next: NextFunction) => {
  const { secretKey, expiresIn } = jwtConfig;
  const signToken = sign({ ...req.userDb }, secretKey, { expiresIn });

  req.token = signToken;

  return next();
};

export default authToken;
