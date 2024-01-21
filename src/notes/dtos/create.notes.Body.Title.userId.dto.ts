import { IsNumber, IsString } from 'class-validator';
// import {} from '';
export class CreateNotesDto {
  @IsString()
  public Title: string;

  @IsString()
  public Body: string;

  @IsNumber()
  public userid: number;
}
