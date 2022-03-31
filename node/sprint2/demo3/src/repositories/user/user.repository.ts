import { Repository, getRepository } from "typeorm";
import { User } from "../../entities/User";
import { IUser, IUserRepo } from "./interfaces";

class UserRepository implements IUserRepo {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  saveUser = async (user: IUser) => await this.ormRepository.save(user);
  findUsers = async () => await this.ormRepository.find();
}

export { UserRepository, IUser };
