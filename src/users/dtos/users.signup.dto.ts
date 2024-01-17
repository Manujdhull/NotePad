import { IsNotEmpty, IsString } from 'class-validator';

export class UserDtoSignUp {
  @IsNotEmpty()
  @IsString()
  public username: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}
