import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

interface UserRepo {
  save: (user: User) => Promise<User>;
  find: () => Promise<User[]>;
  findOneBy: (payload: object) => Promise<User>;
  update: (id: string, data: Partial<User>) => Promise<User>;
  delete: (id: string) => Promise<User>;
}

class UserRepository implements UserRepo {
  private ormRepo: Repository<User>;

  constructor() {
    this.ormRepo = getRepository(User);
  }

  save = (user: User) => this.ormRepo.save(user);
  find = () => this.ormRepo.find();
  findOneBy = (payload: object) => {
    return this.ormRepo.findOne({ where: payload });
  };
  update = (id: string, data: Partial<User>) => {
    return this.ormRepo.save({ id, ...data });
  };
  delete = async (id: string) => {
    const user = await this.ormRepo.findOne(id);
    this.ormRepo.delete(user.id);
    return user;
  };
}

export { UserRepository, UserRepo };
