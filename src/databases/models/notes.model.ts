import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { SharedNoteModel } from './shared-Notes.model';
import { UserModel } from './user.model';

@Table({ tableName: 'Notes' })
export class NotesModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column({ allowNull: false })
  Title: string;

  @Column({ allowNull: false })
  Body: string;

  @Column
  username: string;

  @Column
  public createdAt: Date;

  @Column
  public updatedAt: Date;
}
