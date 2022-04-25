import { config } from 'dotenv';
config();

interface JWTConfig {
  expiresIn: string;
  secretKey: string;
}

const jwtConfig: JWTConfig = {
  expiresIn: process.env.EXPIRES_IN,
  secretKey: process.env.SECRET_KEY,
};

export default jwtConfig;
