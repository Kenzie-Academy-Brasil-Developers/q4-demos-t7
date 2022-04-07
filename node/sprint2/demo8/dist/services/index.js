"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductService = exports.createUserService = void 0;
var create_service_1 = __importDefault(require("./product/create.service"));
exports.createProductService = create_service_1.default;
var create_service_2 = __importDefault(require("./users/create.service"));
exports.createUserService = create_service_2.default;
//# sourceMappingURL=index.js.map