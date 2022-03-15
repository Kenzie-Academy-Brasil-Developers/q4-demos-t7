import express from 'express';

const app = express();
const PORT = 3000;

// para receber o body da requisição
app.use(express.json());

const USERS = [{ username: ':edu:', email: 'e@du.com' }];

app.get('/api', (_, res) => {
  res.status(200).json(USERS);
});

// req é abreveiação de request  -> request = requisição do usuário
// res é abreveiação de response -> response = res de sua rota
app.post('/api', (req, res) => {
  const { username, email } = req.body;

  USERS.push({ username, email });
  res.status(201).json({ username, email });
});

app.listen(PORT, () => console.log(`App is runnining on port ${PORT}`));
