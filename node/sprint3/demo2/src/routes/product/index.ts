import { Router } from "express";
import {
  createProductController,
  retreiveProductsController,
} from "../../controllers";
import { validateShape, verifyAdminAuth } from "../../middlewares";
import { createProductShape } from "../../shapes";

const productRouter = Router();

productRouter.post(
  "/register",
  verifyAdminAuth,
  validateShape(createProductShape),
  createProductController
);

productRouter.get("", verifyAdminAuth, retreiveProductsController);

export default productRouter;
