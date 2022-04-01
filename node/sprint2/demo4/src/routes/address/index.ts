import { Router } from "express";
import { createAddressController } from "../../controllers";
import { validateShape } from "../../middlewares";
import { createAddressShape } from "../../shapes";

const addressRouter = Router();

addressRouter.put("/:id", validateShape(createAddressShape), createAddressController);

export default addressRouter;
