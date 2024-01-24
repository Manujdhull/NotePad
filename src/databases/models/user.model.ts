import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Exclude } from 'class-transformer';
import { NoteModel } from './note.model';

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
  public password: string;

  @Column
  public createdAt: Date;

  @Column
  public updatedAt: Date;
}
