import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import dotenv from 'dotenv';
import { JWTConfig, User, UsersDB } from './intefaces';

dotenv.config();

const USERS: UsersDB = [];
for (let i = 0; i < 10; i += 1) {
  const username: string = faker.name.firstName().toLowerCase();
  const word: string = faker.word.adjective();
  const password: string = bcrypt.hashSync(faker.word.preposition(4), 10);

  const user: User = {
    uuid: v4(),
    username,
    email: `${username}@${word}.com`,
    password,
  };

  USERS.push(user);
}

const config: JWTConfig = {
  secretKey: process.env.SECRET_KEY,
  expiresIn: process.env.EXPIRES_IN ?? '1h',
};

export { USERS, config, JWTConfig, User, UsersDB };
