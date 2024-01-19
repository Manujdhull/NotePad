import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({tableName:'Notes'})
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
