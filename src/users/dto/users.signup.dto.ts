import { IsString } from 'class-validator';
import { UserModel } from '../../databases/users.model/user.model';

export class UserDtoSignUp {
  @IsString()
  username: string;

  @IsString()
  password: string;
  // constructor (user:UserModel){
  //   this.username=user.username,
  //   this.password=user.password
  // }
}
