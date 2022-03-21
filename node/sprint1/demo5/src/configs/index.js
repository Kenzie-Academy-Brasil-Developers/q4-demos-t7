import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const USERS = [];
for (let i = 0; i < 10; i += 1) {
  const username = faker.name.firstName().toLowerCase();
  const word = faker.word.adjective();
  const password = bcrypt.hashSync(faker.word.preposition(4), 10);

  USERS.push({
    uuid: v4(),
    username,
    email: `${username}@${word}.com`,
    password,
  });
}

const config = {
  secretKey: process.env.SECRET_KEY,
  expiresIn: process.env.EXPIRES_IN, // lê numero como se fosse segundos
};

export { USERS, config };
