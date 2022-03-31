import { Router } from "express";
import { createUserController, getUsersController } from "../controllers";

const router = Router();

router.get("", getUsersController);

router.post("", createUserController);

export default router;
