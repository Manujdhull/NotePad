import { IsNotEmpty, IsString } from 'class-validator';

export class NotesDto {
  @IsString()
  public title: string;

  @IsString()
  public body: string;
}
