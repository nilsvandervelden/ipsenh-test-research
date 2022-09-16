import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;
}
