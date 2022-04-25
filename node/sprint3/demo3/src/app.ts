import express, { json } from 'express';
import userRouter from './routes';

const app = express();

app.use(json());
app.use('/api', userRouter);

export default app;
