import { Router } from "express";
import { createUserController, loginUserController } from "../../controllers";
import { authToken, validateAdmin, validateShape } from "../../middlewares";
import { createUserShape, loginShape } from "../../shapes";

const userRouter = Router();

userRouter.post(
  "/register",
  validateShape(createUserShape),
  validateAdmin,
  createUserController
);

userRouter.post(
  "/login",
  validateShape(loginShape),
  authToken,
  loginUserController
);

export default userRouter;
