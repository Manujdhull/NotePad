import { IsNotEmpty, IsString } from 'class-validator';

export class NoteDtoSignUp {
    // @IsNotEmpty()
    // @IsString()
    // public username:string

    @IsNotEmpty()
    @IsString()
    public Title: string;

    @IsString()
    public Body: string;
}
