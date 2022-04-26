import { faker } from '@faker-js/faker';
import { existsSync } from 'fs';
import { unlink } from 'fs/promises';
import path from 'path';
import { createConnection, getConnection } from 'typeorm';
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

class ConnectionTestJest {
  dbPath: string;

  constructor() {
    this.dbPath = path.join(__dirname, '../../dbTest.sqlite');
  }

  create = async () => {
    if (existsSync(this.dbPath)) {
      await unlink(this.dbPath);
    }

    await createConnection('default');
  };

  close = async () => {
    await getConnection('default').close();

    if (existsSync(this.dbPath)) {
      await unlink(this.dbPath);
    }
  };

  clear = async () => {
    const connection = getConnection('default');
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  };
}

export { generateUser, ConnectionTestJest };
