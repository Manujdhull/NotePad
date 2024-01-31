import { IsNotEmpty, IsString } from 'class-validator';
export class UserDtoEmail {
  // @IsNotEmpty()
  @IsString()
  public Email: string;
}
