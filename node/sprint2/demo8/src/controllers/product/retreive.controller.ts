import { Request, Response } from "express";
import { ProductRepository } from "../../repositories";

const retreiveProductsController = async (_: Request, res: Response) => {
  const products = await new ProductRepository().getAll();

  return res.status(200).json(products);
};

export default retreiveProductsController;
