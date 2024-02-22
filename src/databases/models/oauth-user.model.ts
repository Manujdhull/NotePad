import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'UserOauth' })
export class UserOauthModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column
  public email: string;

  @Column
  public displayName: string;

  @Column
  public createdAt: Date;

  @Column
  public updatedAt: Date;
}
