import User from '../entities/User';

declare global {
  namespace Express {
    interface Request {
      userDb: User;
      token: string;
      decoded: Partial<User>;
    }
  }
}
