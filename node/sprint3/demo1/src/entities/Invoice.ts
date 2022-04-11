import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./Order";

@Entity("invoices")
export class Invoice {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: new Date() })
  release_date: Date;

  @Column({ type: "uuid", unique: true })
  invoice_number: string;

  @OneToOne(() => Order, { nullable: true })
  @JoinColumn()
  order_id: string;
}
