import { USERS } from '../configs';

const deleteUserController = (req, res) => {
  const userIndex = USERS.indexOf(req.user);
  USERS.splice(userIndex, 1);

  return res.status(200).json({ user: req.user });
};

export default deleteUserController;
