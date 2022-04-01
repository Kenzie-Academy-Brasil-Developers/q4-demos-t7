import { Router } from "express";
import { getUsersController, createUserController } from "../../controllers";
import { validateShape } from "../../middlewares/";
import { createUserShape } from "../../shapes";

const userRouter = Router();

userRouter.get("", getUsersController);
userRouter.post(
  "/register",
  validateShape(createUserShape),
  createUserController
);
userRouter.post("/login");

export default userRouter;
