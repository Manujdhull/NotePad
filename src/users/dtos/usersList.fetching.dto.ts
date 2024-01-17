import { IsString } from 'class-validator';

export class UsersList {
  @IsString()
  public username: string;
}
