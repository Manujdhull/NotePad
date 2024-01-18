import { IsNumber, IsString } from 'class-validator';

export class CreateNotesDto {
  @IsString()
  public title: string;

  @IsString()
  public body: string;

  @IsNumber()
  public userId: number;
}
