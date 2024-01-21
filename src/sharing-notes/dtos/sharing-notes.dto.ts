import {  IsNotEmpty, IsNumber} from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

export class ShareDto {

  @IsNumber()
  @IsNotEmpty()
  sharedUserId : number;

  @IsNumber()
  @IsNotEmpty()
  sharedToUserId : number;
}