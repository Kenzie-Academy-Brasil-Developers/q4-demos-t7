import { Request, Response } from "express";
import { UserRepository } from "../../repositories";
import { createProductService } from "../../services";
import { IProduct } from "../../types";

const createProductController = async (req: Request, res: Response) => {
  const products = createProductService(req.validated as IProduct);
  return res.status(200).json({ products: await products });
};

export default createProductController;
