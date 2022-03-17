import express from 'express';
import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';
import * as yup from 'yup';
import jsonwebtoken from 'jsonwebtoken';

const app = express();
const PORT = 3000;

// para receber o body da requisição
app.use(express.json());

// --- CONFIGS ---
const USERS = [];
for (let i = 0; i < 10; i += 1) {
  const username = faker.name.firstName().toLowerCase();
  const word = faker.word.adjective();
  const password = faker.word.preposition(4);

  USERS.push({
    uuid: v4(),
    username,
    email: `${username}@${word}.com`,
    password,
  });
}

const config = {
  secretKey: 'peoakpeoake',
  expiresIn: 600, // lê numero como se fosse segundos
};

// --- YUP ---

const createUserShape = yup.object().shape({
  uuid: yup.string().default(() => v4()),
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
});

const loginUserShape = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
});

const updateUserEmailShape = yup.object().shape({
  email: yup.string().email().required(),
});

// --- MIDDLEWARES ---

const getUser = (req, res, next) => {
  const { uuid } = req.params;
  const user = USERS.find((u) => u.uuid === uuid);

  if (!user) {
    return res.status(404).json({ message: 'user not found!' });
  }

  req.user = user;

  return next();
};

const paginate = (genericArray) => (req, _, next) => {
  const page = req.query.page ? req.query.page : 1;
  const perPage = req.query.perPage ? req.query.perPage : 10;
  const paginated = genericArray.slice((page - 1) * perPage, perPage * page);

  req.paginated = paginated;

  return next();
};

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

// --- ROTAS ---

// req é abreveiação de request  -> request = requisição do usuário
// res é abreveiação de response -> response = res de sua rota
app.post('/api/signup', validateShape(createUserShape), (req, res) => {
  const user = { ...req.validated };

  if (USERS.find((_) => _.email === user.email)) {
    return res.status(409).json({ error: 'email already exists' });
  }

  USERS.push(user);
  return res.status(201).json(user);
});

app.post('/api/login', validateShape(loginUserShape), (req, res) => {
  const { email } = req.validated;

  if (!USERS.find((user) => user.email === email)) {
    return res.status(404).json({ error: 'user not found' });
  }

  const token = jsonwebtoken.sign({ email }, config.secretKey, {
    expiresIn: config.expiresIn,
  });

  return res.status(200).json({ token });
});

app.get('/api', paginate(USERS), (req, res) => {
  const { paginated } = req;
  return res.status(200).json(paginated);
});

app.get('/api/:uuid', getUser, (req, res) => {
  const { user } = req;

  return res.status(200).json(user);
});

app.put(
  '/api/:uuid/email',
  validateShape(updateUserEmailShape),
  getUser,
  (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    jsonwebtoken.verify(token, config.secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: err });
      }

      console.log(decoded);
    });
    const { email } = req.validated;
    const { user } = req;

    user.email = email;

    return res.status(200).json(user);
  }
);

app.listen(PORT, () => console.log(`App is runnining on port ${PORT}`));
