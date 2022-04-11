import { User } from "../entities/User";
import { IProduct } from "../types";

declare global {
  namespace Express {
    interface Request {
      validated: User | IProduct;
      token: string;
    }
  }
}
