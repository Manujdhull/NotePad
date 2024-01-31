import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'Notes', paranoid: true })
export class NoteModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column({ allowNull: false })
  public Title: string;

  @Column({ allowNull: false })
  public Body: string;

  @DeletedAt
  public deletedAt: boolean;

  @Column
  public userid: number;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;
}
