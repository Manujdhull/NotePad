import { IsString } from 'class-validator';

export class NotesDto {
  @IsString()
  public Title: string;

  @IsString()
  public Body: string;
}
