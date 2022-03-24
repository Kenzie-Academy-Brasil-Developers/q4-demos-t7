import { User, UsersDB } from '../configs';

declare global {
  namespace Express {
    interface Request {
      validated: User;
      user: User;
      paginated: UsersDB;
      email: string;
    }
  }
}
