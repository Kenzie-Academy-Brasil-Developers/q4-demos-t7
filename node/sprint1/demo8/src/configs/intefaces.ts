type ExpiresIN = string | number;

interface JWTConfig {
  secretKey: string;
  expiresIn: ExpiresIN;
}

interface User {
  uuid: string;
  username: string;
  email: string;
  password: string;
}

type UsersDB = Array<User>;

export { JWTConfig, User, UsersDB };
