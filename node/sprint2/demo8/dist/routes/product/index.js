"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../../controllers");
var middlewares_1 = require("../../middlewares");
var shapes_1 = require("../../shapes");
var productRouter = (0, express_1.Router)();
productRouter.post("/register", middlewares_1.verifyAdminAuth, (0, middlewares_1.validateShape)(shapes_1.createProductShape), controllers_1.createProductController);
productRouter.get("", middlewares_1.verifyAdminAuth, controllers_1.retreiveProductsController);
exports.default = productRouter;
//# sourceMappingURL=index.js.map