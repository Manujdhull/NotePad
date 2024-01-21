import {  IsNotEmpty, IsNumber} from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

export class ShareDto {

  // @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  shared_note_id : number;

  // @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  shared_to_user_id : number;

}