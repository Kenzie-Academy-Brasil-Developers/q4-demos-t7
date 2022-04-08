"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retreiveProductsController = exports.createProductController = exports.createUserController = exports.loginUserController = void 0;
var create_controller_1 = __importDefault(require("./user/create.controller"));
exports.createUserController = create_controller_1.default;
var login_controller_1 = __importDefault(require("./user/login.controller"));
exports.loginUserController = login_controller_1.default;
var create_controller_2 = __importDefault(require("./product/create.controller"));
exports.createProductController = create_controller_2.default;
var retreive_controller_1 = __importDefault(require("./product/retreive.controller"));
exports.retreiveProductsController = retreive_controller_1.default;
//# sourceMappingURL=index.js.map