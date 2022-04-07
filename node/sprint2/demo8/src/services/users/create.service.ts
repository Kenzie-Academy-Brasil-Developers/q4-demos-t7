import { QueryFailedError } from "typeorm";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories";
import { ErrorHandler } from "../../utils";

interface IDetail extends QueryFailedError {
  detail: string;
}

const createUserService = async (user: User) => {
  try {
    const { password, ...newUser } = await new UserRepository().save(user);
    return newUser;
  } catch (error) {
    if (error instanceof QueryFailedError) {
      const detail = (error as IDetail).detail;
      if (detail.includes("already exists")) {
        throw new ErrorHandler(409, detail);
      }
    }
  }
};

export default createUserService;
