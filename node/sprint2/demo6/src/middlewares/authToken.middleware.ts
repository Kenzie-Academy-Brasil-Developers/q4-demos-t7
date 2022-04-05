import { compareSync } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import jwtConfig from "../configs";
import { User } from "../entities/User";
import { UserRepository } from "../repositories";

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await new UserRepository().findByEmail(
      (req.validated as User).email
    );

    if (!user) {
      return res.status(400).json({ error: "invalid credentials" });
    }

    if (!compareSync((req.validated as User).password, user.password)) {
      return res.status(400).json({ error: "invalid credentials" });
    }

    const token: string = sign({ user }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });

    req.token = token;

    return next();
  } catch (error) {
    console.log("xd");
    return res.status(400).json(error);
  }
};

export default authToken
