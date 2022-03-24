import { string } from 'yup';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_KEY: string;
    }
  }
}
