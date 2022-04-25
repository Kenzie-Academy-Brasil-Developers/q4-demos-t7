/* eslint-disable indent */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  firstName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}

export default User;
