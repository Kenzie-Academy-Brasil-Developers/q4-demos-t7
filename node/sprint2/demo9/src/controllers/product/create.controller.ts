import { Request, Response } from "express";
import { UserRepository } from "../../repositories";
import { createProductService } from "../../services";
import { IProduct } from "../../types";

const createProductController = async (req: Request, res: Response) => {
  const products = createProductService(req.validated as IProduct);
  return res.status(200).json({ products: await products });
};

const exemplo = async (req: Request, res: Response) => {
  const user = await new UserRepository().findByEmail(req.body.emil);
  const order = new OrderRepository().findById(req.params.orderId);

  // user.orders.push(order);
  // new UserRepository().save(user);

  // order.user = user
  // new OrderRepository().save(order);

  return res.status(201).json(user);
};

export default createProductController;
