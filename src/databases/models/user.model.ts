import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Exclude } from 'class-transformer'

@Table
export class UserModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column({ unique: true })
  public username: string;

  @Column
  @Exclude()
  password: string;

  @Column
  createdAt: Date;

  @Column
  updatedat: Date;
}
