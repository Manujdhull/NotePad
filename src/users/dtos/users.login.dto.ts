import { IsNotEmpty, IsString } from 'class-validator';
import { CheckPasswordMatch } from '../Validations/checkPasswordMatch.validation';
import { CheckUserExists } from '../Validations/checkUserExists.validation';
export class UserDtoLogin {
  @IsNotEmpty()
  @IsString()
  public username: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}
