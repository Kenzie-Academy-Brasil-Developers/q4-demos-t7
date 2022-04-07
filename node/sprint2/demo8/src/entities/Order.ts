import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderProduct } from "./OrderProduct";
import { User } from "./User";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: new Date() })
  order_date: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderProduct, (orderProducts) => orderProducts.order)
  orderProducts: OrderProduct[];
}
