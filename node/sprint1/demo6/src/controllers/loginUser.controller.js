import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { USERS, config } from '../configs';

const loginUserController = async (req, res) => {
  const { email } = req.validated;
  const user = USERS.find((_) => _.email === email);

  if (!user) {
    return res.status(400).json({ error: 'invalid credentials' });
  }

  const hasedPassword = await bcrypt.compare(req.body.password, user.password);

  if (!hasedPassword) {
    return res.status(400).json({ error: 'invalid credentials' });
  }

  const token = jsonwebtoken.sign({ email }, config.secretKey, {
    expiresIn: config.expiresIn,
  });

  return res.status(200).json({ token });
};

export default loginUserController;
