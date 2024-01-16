import { IsString } from 'class-validator';

export class UsersList {
  @IsString()
  username: string;
}
