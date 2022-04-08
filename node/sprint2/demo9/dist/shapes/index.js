"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductShape = exports.createUserShape = exports.loginShape = void 0;
var login_shape_1 = __importDefault(require("./user/login.shape"));
exports.loginShape = login_shape_1.default;
var create_shape_1 = __importDefault(require("./user/create.shape"));
exports.createUserShape = create_shape_1.default;
var create_shape_2 = __importDefault(require("./product/create.shape"));
exports.createProductShape = create_shape_2.default;
//# sourceMappingURL=index.js.map