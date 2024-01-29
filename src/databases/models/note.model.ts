import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'Notes' })
export class NoteModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column({ allowNull: false })
  Title: string;

  @Column({ allowNull: false })
  Body: string;

  @Column
  userid: number;

  @Column
  public createdAt: Date;

  @Column
  public updatedAt: Date;
}
