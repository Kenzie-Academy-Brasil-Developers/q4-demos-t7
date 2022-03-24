import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const baseURL = '/api';

const generateUser = () => {
  const username = faker.name.firstName().toLowerCase();
  const word = faker.word.adjective();
  const password = bcrypt.hashSync(faker.word.preposition(4), 10);

  return {
    uuid: v4(),
    username,
    email: `${username}@${word}.com`,
    password,
  };
};

export { generateUser, baseURL };
