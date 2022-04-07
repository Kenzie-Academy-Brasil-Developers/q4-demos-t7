"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../../controllers");
var middlewares_1 = require("../../middlewares");
var shapes_1 = require("../../shapes");
var userRouter = (0, express_1.Router)();
userRouter.post("/register", (0, middlewares_1.validateShape)(shapes_1.createUserShape), middlewares_1.validateAdmin, controllers_1.createUserController);
userRouter.post("/login", (0, middlewares_1.validateShape)(shapes_1.loginShape), middlewares_1.authToken, controllers_1.loginUserController);
exports.default = userRouter;
//# sourceMappingURL=index.js.map