import { Router } from "express";
import productRouter from "./product";
import userRouter from "./user";

const router = Router();

router.use("/users", userRouter);
router.use("/products", productRouter);

export default router;
