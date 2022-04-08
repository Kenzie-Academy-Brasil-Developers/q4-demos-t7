"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var configs_1 = __importDefault(require("../configs"));
var utils_1 = require("../utils");
var validateAdmin = function (req, _, next) {
    var _a;
    try {
        if (req.validated.isAdmin) {
            var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token) {
                throw new utils_1.ErrorHandler(401, "missing authorization token");
            }
            (0, jsonwebtoken_1.verify)(token, configs_1.default.secretKey, function (err, decoded) {
                if (err) {
                    throw new utils_1.ErrorHandler(401, err);
                }
                if (!decoded.user.isAdmin) {
                    throw new utils_1.ErrorHandler(401, "missing admin permission");
                }
                return next();
            });
        }
        else {
            return next();
        }
    }
    catch (error) {
        return next(error);
    }
};
exports.default = validateAdmin;
//# sourceMappingURL=validateAdmin.middleware.js.map