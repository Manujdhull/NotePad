import { IsNotEmpty, IsString } from 'class-validator';
export class UserDtoLogin {
  @IsNotEmpty()
  @IsString()
  public username: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}
