import { Router } from "express";
import userRouter from "./user";
import addressRouter from './address';

const router = Router();

router.use("/users", userRouter)
router.use("/addresses", addressRouter)

export default router;
