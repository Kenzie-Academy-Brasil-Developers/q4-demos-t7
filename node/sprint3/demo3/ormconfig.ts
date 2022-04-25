import dotenv from 'dotenv';

dotenv.config();

const devEnv = {
  type: 'postgres',
  host: 'localhost',
  port: process.env.PGPORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: false,
  entities: ['src/entities/**/*.*'],
  migrations: ['src/migrations/**/*.*'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
};

const testEnv = {
  type: 'sqlite',
  database: './dbTest.sqlite',
  synchronize: true,
  entities: ['src/entities/**/*.*'],
};

export default process.env.NODE_ENV === 'test' ? testEnv : devEnv;
