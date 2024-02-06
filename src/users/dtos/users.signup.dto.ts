import { IsNotEmpty, IsString } from 'class-validator';
import { CheckUserExists } from '../validations/checkUserExists.validation';
export class UserDtoSignUp {
  @IsNotEmpty()
  @IsString()
  @CheckUserExists({
    message: 'User  already exists. Choose another name.',
  })
  public username: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}
