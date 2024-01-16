import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class UserModel extends Model {
  // @Column ({ primaryKey:true,
  //   autoIncrement:true})
  // id:number

  @Column({ unique: true })
  username: string;

  @Column
  password: string;

  // @Column
  // createdAt:Date;

  // @Column
  // updatedat:Date;
}
