import jsonwebtoken from 'jsonwebtoken';
import { config } from '../configs';

const validateAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  jsonwebtoken.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: err });
    }

    req.email = decoded.email;
    return next();
  });
};

export default validateAuth;
