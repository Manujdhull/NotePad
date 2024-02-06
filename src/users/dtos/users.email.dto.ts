import { IsString } from 'class-validator';
export class UserDtoEmail {
  @IsString()
  public Email: string;
}
