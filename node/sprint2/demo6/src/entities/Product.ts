import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderProduct } from './OrderProduct';

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ type: "float" })
  price: number; // interger | float

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[]
}
