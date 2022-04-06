import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from './Order';
import { Product } from "./Product";

@Entity("order_products")
export class OrderProduct {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "float" })
  sale_value: number;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  order: Order;
}
