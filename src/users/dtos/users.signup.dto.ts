import { IsNotEmpty, IsString } from 'class-validator';
import { CheckUserExists } from '../Validations/checkUserExists.validation';
import {CheckPasswordMatch} from '../Validations/checkPasswordMatch.validation'
export class UserDtoSignUp {
  @IsNotEmpty()
  @IsString()
  @CheckUserExists({
    // message: 'User  already exists. Choose another name.',
  })
  public username: string;

  @IsNotEmpty()
  @IsString()
  @CheckPasswordMatch()
  public password: string;
}
