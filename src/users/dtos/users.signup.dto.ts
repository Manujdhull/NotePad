import { IsString } from 'class-validator';
import { UserModel } from '../../databases/models/user.model';

export class UserDtoSignUp {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
