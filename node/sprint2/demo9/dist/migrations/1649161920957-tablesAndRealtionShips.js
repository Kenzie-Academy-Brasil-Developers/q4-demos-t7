"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tablesAndRealtionShips1649161920957 = void 0;
var tablesAndRealtionShips1649161920957 = /** @class */ (function () {
    function tablesAndRealtionShips1649161920957() {
        this.name = 'tablesAndRealtionShips1649161920957';
    }
    tablesAndRealtionShips1649161920957.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("CREATE TABLE \"products\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"name\" character varying(50) NOT NULL, \"price\" double precision NOT NULL, CONSTRAINT \"PK_0806c755e0aca124e67c0cf6d7d\" PRIMARY KEY (\"id\"))")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"order_products\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"sale_value\" double precision NOT NULL, \"productId\" uuid, \"orderId\" uuid, CONSTRAINT \"PK_3e59f094c2dc3310d585216a813\" PRIMARY KEY (\"id\"))")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"orders\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"order_date\" TIMESTAMP NOT NULL DEFAULT '\"2022-04-05T12:32:02.123Z\"', \"userId\" uuid, CONSTRAINT \"PK_710e2d4957aa5878dfe94e4ac2f\" PRIMARY KEY (\"id\"))")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"invoices\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"release_date\" TIMESTAMP NOT NULL DEFAULT '\"2022-04-05T12:32:02.181Z\"', \"invoice_number\" uuid NOT NULL, \"orderIdId\" uuid, CONSTRAINT \"UQ_d8f8d3788694e1b3f96c42c36fb\" UNIQUE (\"invoice_number\"), CONSTRAINT \"REL_a76b12b23a1fd62b32e26ddef8\" UNIQUE (\"orderIdId\"), CONSTRAINT \"PK_668cef7c22a427fd822cc1be3ce\" PRIMARY KEY (\"id\"))")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"order_products\" ADD CONSTRAINT \"FK_27ca18f2453639a1cafb7404ece\" FOREIGN KEY (\"productId\") REFERENCES \"products\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"order_products\" ADD CONSTRAINT \"FK_28b66449cf7cd76444378ad4e92\" FOREIGN KEY (\"orderId\") REFERENCES \"orders\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"orders\" ADD CONSTRAINT \"FK_151b79a83ba240b0cb31b2302d1\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"invoices\" ADD CONSTRAINT \"FK_a76b12b23a1fd62b32e26ddef8a\" FOREIGN KEY (\"orderIdId\") REFERENCES \"orders\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    tablesAndRealtionShips1649161920957.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE \"invoices\" DROP CONSTRAINT \"FK_a76b12b23a1fd62b32e26ddef8a\"")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"orders\" DROP CONSTRAINT \"FK_151b79a83ba240b0cb31b2302d1\"")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"order_products\" DROP CONSTRAINT \"FK_28b66449cf7cd76444378ad4e92\"")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"order_products\" DROP CONSTRAINT \"FK_27ca18f2453639a1cafb7404ece\"")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"invoices\"")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"orders\"")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"order_products\"")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"products\"")];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return tablesAndRealtionShips1649161920957;
}());
exports.tablesAndRealtionShips1649161920957 = tablesAndRealtionShips1649161920957;
//# sourceMappingURL=1649161920957-tablesAndRealtionShips.js.map