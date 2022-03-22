const updateUserEmailController = (req, res) => {
  const { email } = req.validated;
  const { user } = req;

  user.email = email;

  return res.status(200).json(user);
};

export default updateUserEmailController;
