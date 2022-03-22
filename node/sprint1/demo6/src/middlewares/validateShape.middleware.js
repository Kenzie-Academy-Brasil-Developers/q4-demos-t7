const validateShape = (shape) => async (req, res, next) => {
  try {
    const validated = await shape.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    req.validated = validated;
    return next();
  } catch (e) {
    return res.status(400).json({ error: e.errors });
  }
};

export default validateShape;
