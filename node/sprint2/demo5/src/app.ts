import express, { json } from "express";

const app = express();

app.use(json());

export default app;
