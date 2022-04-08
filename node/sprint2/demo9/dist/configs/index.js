"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var jwtConfig = {
    secretKey: process.env.SECRET_KEY,
    expiresIn: process.env.EXPIRES_IN,
};
exports.default = jwtConfig;
//# sourceMappingURL=index.js.map