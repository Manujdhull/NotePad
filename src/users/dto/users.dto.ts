import { IsString, IsInt } from 'class-validator'
export class UserDtoSignUp {
    @IsString()
    userName: string;

    @IsString()
    password: string;
}

export class UserDtoLogin {
    @IsString()
    userName: string;

    @IsString()
    password: string;
}