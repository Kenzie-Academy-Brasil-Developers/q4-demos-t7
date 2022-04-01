import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  street: string;

  @Column()
  neighborHood: string;

  @Column({ length: 9 }) // 12345123
  zipCode: string;       // 00034789 -> 34789
}
