interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}

interface IUserRepo {
  saveUser: (user: IUser) => Promise<IUser>;
  findUsers: () => Promise<IUser[]>;
}

export { IUser, IUserRepo };
