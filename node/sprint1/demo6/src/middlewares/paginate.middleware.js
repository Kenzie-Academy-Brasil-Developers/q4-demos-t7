const paginate = (genericArray) => (req, _, next) => {
  const page = req.query.page ? req.query.page : 1;
  const perPage = req.query.perPage ? req.query.perPage : 10;
  const paginated = genericArray.slice((page - 1) * perPage, perPage * page);

  req.paginated = paginated;

  return next();
};

export default paginate;
