import { faker } from '@faker-js/faker';
import User from '../entities/User';

const generateUser = (): User => {
  const firstName = faker.name.firstName().toLowerCase();
  const email = faker.internet.email(firstName).toLowerCase();
  const password = faker.datatype.string(10);

  return {
    firstName,
    email,
    password,
  };
};

export { generateUser };
