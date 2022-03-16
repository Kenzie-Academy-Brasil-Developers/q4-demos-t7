import express from 'express';
import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';

const app = express();
const PORT = 3000;

// para receber o body da requisição
app.use(express.json());

const USERS = [];
for (let i = 0; i < 10; i += 1) {
  const username = faker.name.firstName().toLowerCase();
  const word = faker.word.adjective();

  USERS.push({ uuid: v4(), username, email: `${username}@${word}.com` });
}

// req é abreveiação de request  -> request = requisição do usuário
// res é abreveiação de response -> response = res de sua rota
app.post('/api', (req, res) => {
  const { username, email } = req.body;

  USERS.push({ username, email });
  res.status(201).json({ username, email });
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

app.get('/api', paginate(USERS), (req, res) => {
  const { paginated } = req;
  return res.status(200).json(paginated);
});

app.get('/api/:uuid', getUser, (req, res) => {
  const { user } = req;

  return res.status(200).json(user);
});

app.put('/api/:uuid/email', getUser, (req, res) => {
  const { email } = req.body;
  const { user } = req;

  user.email = email;

  return res.status(200).json(user);
});

app.listen(PORT, () => console.log(`App is runnining on port ${PORT}`));
