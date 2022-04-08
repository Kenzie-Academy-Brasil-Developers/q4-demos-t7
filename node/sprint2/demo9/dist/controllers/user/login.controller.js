"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loginUserController = function (req, res) {
    return res.status(200).json({ token: req.token });
};
exports.default = loginUserController;
//# sourceMappingURL=login.controller.js.map