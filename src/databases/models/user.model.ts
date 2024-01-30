import {
  AutoIncrement,
  Column,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Exclude } from 'class-transformer';

@Table({ tableName: 'Users' })
export class UserModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column({ unique: true })
  public username: string;

  @Column
  public Email:string

  @Column
  @Exclude()
  public password: string;

  @Column
  public createdAt: Date;

  @Column
  public updatedAt: Date;
}