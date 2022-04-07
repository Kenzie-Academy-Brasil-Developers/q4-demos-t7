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
exports.OrderProduct = void 0;
var typeorm_1 = require("typeorm");
var Order_1 = require("./Order");
var Product_1 = require("./Product");
var OrderProduct = /** @class */ (function () {
    function OrderProduct() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], OrderProduct.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "float" }),
        __metadata("design:type", Number)
    ], OrderProduct.prototype, "sale_value", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Product_1.Product; }, function (product) { return product.orderProducts; }),
        __metadata("design:type", Product_1.Product)
    ], OrderProduct.prototype, "product", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Order_1.Order; }, function (order) { return order.orderProducts; }),
        __metadata("design:type", Order_1.Order)
    ], OrderProduct.prototype, "order", void 0);
    OrderProduct = __decorate([
        (0, typeorm_1.Entity)("order_products")
    ], OrderProduct);
    return OrderProduct;
}());
exports.OrderProduct = OrderProduct;
//# sourceMappingURL=OrderProduct.js.map