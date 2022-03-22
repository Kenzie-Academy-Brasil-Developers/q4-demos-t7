const retrieveUserController = (req, res) => {
  const { paginated } = req;
  return res.status(200).json(paginated);
};

export default retrieveUserController;
