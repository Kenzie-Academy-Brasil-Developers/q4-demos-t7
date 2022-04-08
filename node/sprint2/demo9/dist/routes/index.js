"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var product_1 = __importDefault(require("./product"));
var user_1 = __importDefault(require("./user"));
var router = (0, express_1.Router)();
router.use("/users", user_1.default);
router.use("/products", product_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map