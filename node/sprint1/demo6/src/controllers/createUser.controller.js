import { USERS } from '../configs';

const createUserController = (req, res) => {
  const user = { ...req.validated };

  if (USERS.find((_) => _.email === user.email)) {
    return res.status(409).json({ error: 'email already exists' });
  }

  USERS.push(user);
  return res.status(201).json(user);
};

export default createUserController;
