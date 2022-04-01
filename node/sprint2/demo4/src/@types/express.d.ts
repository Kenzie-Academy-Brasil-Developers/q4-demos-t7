import * as express from "express";
import { IAddress, IUser } from "../repositories";

declare global {
  namespace Express {
    interface Request {
      validated: IUser | IAddress;
    }
  }
}
