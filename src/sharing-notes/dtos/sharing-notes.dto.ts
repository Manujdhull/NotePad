import { IsNotEmpty, IsNumber } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

export class ShareDto {
  @IsNumber()
  @IsNotEmpty()
  senId: number;

  @IsNumber()
  @IsNotEmpty()
  sharedNoteId: number;
}
