import { Repository, getRepository } from "typeorm";
import { Address } from "../../entities/Address";
import { IAddress, IAddressRepo } from "./interfaces";

class AddressRepository implements IAddressRepo {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  saveAddress = async (addres: IAddress) => {
    return await this.ormRepository.save(addres);
  };
}

export { AddressRepository, IAddress };
