const verifyUserPermission = (req, res, next) => {
  const { user, email } = req;

  if (user.email !== email) {
    return res.status(401).json({ error: 'unauthorazed' });
  }

  return next();
};

export default verifyUserPermission;
