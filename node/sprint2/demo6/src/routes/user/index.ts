import { Router } from "express";
import { loginUserController } from "../../controllers";
import { authToken, validateShape } from "../../middlewares";
import { loginShape } from "../../shapes";

const userRouter = Router();

userRouter.post("/register");
userRouter.post(
  "/login",
  validateShape(loginShape),
  authToken,
  loginUserController
);

export default userRouter;
