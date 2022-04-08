import express, { json, NextFunction, Request, Response } from "express";
import router from "./routes";
import { handleError } from "./utils";

const app = express();

app.use(json());
app.use("/api", router);
app.use((err: any, _: Request, res: Response, __: NextFunction) => {
  return handleError(err, res);
});

export default app;
