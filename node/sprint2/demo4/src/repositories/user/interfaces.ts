interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string
}

interface IUserRepo {
  saveUser: (user: IUser) => Promise<IUser>;
  findUsers: () => Promise<IUser[]>;
  findById: (id: string) => Promise<IUser[]>;
}

export { IUser, IUserRepo };
