"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
var typeorm_1 = require("typeorm");
var OrderProduct_1 = require("./OrderProduct");
var User_1 = require("./User");
var Order = /** @class */ (function () {
    function Order() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Order.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: new Date() }),
        __metadata("design:type", Date)
    ], Order.prototype, "order_date", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.orders; }),
        __metadata("design:type", User_1.User)
    ], Order.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return OrderProduct_1.OrderProduct; }, function (orderProducts) { return orderProducts.order; }),
        __metadata("design:type", Array)
    ], Order.prototype, "orderProducts", void 0);
    Order = __decorate([
        (0, typeorm_1.Entity)("orders")
    ], Order);
    return Order;
}());
exports.Order = Order;
//# sourceMappingURL=Order.js.map