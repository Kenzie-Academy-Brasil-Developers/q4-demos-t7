import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import jwtConfig from "../configs";
import { User } from "../entities/User";
import { ErrorHandler } from "../utils";

interface IDecoded {
  iat: number;
  exp: number;
  user: User;
}

const validateAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    if ((req.validated as User).isAdmin) {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new ErrorHandler(401, "missing authorization token");
      }

      verify(token, jwtConfig.secretKey, (err, decoded) => {
        if (err) {
          throw new ErrorHandler(401, err);
        }

        if (!(decoded as IDecoded).user.isAdmin) {
          throw new ErrorHandler(401, "missing admin permission");
        }
        return next();
      });
    } else {
      return next();
    }
  } catch (error) {
    return next(error);
  }
};

export default validateAdmin;
