"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var app_1 = __importDefault(require("./app"));
var ormconfig_1 = __importDefault(require("./db/ormconfig"));
(0, typeorm_1.createConnection)(ormconfig_1.default)
    .then(function () {
    var _a;
    var PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
    console.log("Database connected");
    app_1.default.listen(PORT, function () {
        return console.log("App is running on http//localhost:".concat(PORT));
    });
})
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=server.js.map