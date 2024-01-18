import { IsNotEmpty, IsString } from 'class-validator';
import {CheckPasswordMatch} from '../Validations/checkPasswordMatch.validation'
import { CheckUserExists } from '../Validations/checkUserExists.validation';
export class UserDtoLogin {
  @IsNotEmpty()
  @IsString()
  // @CheckUserExists({
  //   message: 'user name not exists',
  // })
  public username: string;

  @IsNotEmpty()
  @IsString()
  // @CheckPasswordMatch({
  //   message: 'password not match',
  // })
  public password: string;
}
