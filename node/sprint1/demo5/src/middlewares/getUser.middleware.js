import { USERS } from '../configs';

const getUser = (req, res, next) => {
  const { uuid } = req.params;
  const user = USERS.find((u) => u.uuid === uuid);

  if (!user) {
    return res.status(404).json({ message: 'user not found!' });
  }

  req.user = user;

  return next();
};

export default getUser;
