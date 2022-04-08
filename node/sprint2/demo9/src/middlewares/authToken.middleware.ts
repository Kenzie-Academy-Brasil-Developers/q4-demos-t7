import { compareSync } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import jwtConfig from "../configs";
import { User } from "../entities/User";
import { UserRepository } from "../repositories";
import { ErrorHandler } from "../utils";

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await new UserRepository().findByEmail(
      (req.validated as User).email
    );

    if (!user) {
      throw new ErrorHandler(400, "invalid credentials");
    }

    if (!compareSync((req.validated as User).password, user.password)) {
      throw new ErrorHandler(400, "invalid credentials");
    }

    const token: string = sign({ user }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });

    req.token = token;

    return next();
  } catch (error) {
    return next(error);
  }
};

export default authToken;
