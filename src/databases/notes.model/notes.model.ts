import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class NotesModel extends Model {
  @Column
  username: string;

  @Column({ allowNull: false })
  Title: string;

  @Column({ allowNull: false })
  Body: string;
}
