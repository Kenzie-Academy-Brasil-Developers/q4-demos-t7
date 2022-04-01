import { Request, Response } from "express";
import { UserRepository, AddressRepository } from "../../repositories";

const createAddressController = async (req: Request, res: Response) => {
  const userRepo = new UserRepository();

  const [user] = await userRepo.findById(req.params.id);
  const address = await new AddressRepository().saveAddress(req.body);

  user.address = address;
  userRepo.saveUser(user);

  return res.status(201).json(user);
};

export default createAddressController;
