import express, { json, Request, Response } from 'express';

const app = express();
app.use(json());

app.get('/', (_: Request, res: Response) => res.send('ok'));

app.listen(3000, () => console.log(`App running on 3000`));
