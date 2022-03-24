import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { USERS, config, User } from '../configs';
import { Request, Response } from 'express';

// esse service estaria na pasta services
const loginUserService = async (
  password: string,
  { email }: User
): Promise<string | undefined> => {
  const user: User | undefined = USERS.find((_) => _.email === email);

  if (!user) {
    return undefined;
  }

  const hasedPassword: boolean = await bcrypt.compare(password, user.password);

  if (!hasedPassword) {
    return undefined;
  }

  const token = jsonwebtoken.sign({ email }, config.secretKey, {
    expiresIn: config.expiresIn,
  });

  return token;
};

const loginUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token = loginUserService(req.body.password, req.validated);

  if (!token) {
    res.status(400).json({ error: 'invalid credentials' });
  }

  return res.status(200).json({ token });
};

export default loginUserController;
