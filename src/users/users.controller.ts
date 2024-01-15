import { Controller, Get, Post, Put, Patch, Delete, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDtoLogin, UserDtoSignUp } from './dto/users.dto';
// import {ValidationPipe} from './validation/validation.pipe'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UsePipes(new ValidationPipe({transform: true,whitelist:true}))
    @Post('signUp')
    async create(@Body() userDtoSignUp: UserDtoSignUp){
        console.log(userDtoSignUp instanceof UserDtoSignUp)
         return this.usersService.create(userDtoSignUp);
    }

    @UsePipes(new ValidationPipe({transform: true,whitelist:true}))
    @Get()
    async findAll(): Promise<any> {
        console.log("abscd",this.usersService)
        // return this.usersService.create();
        return "hekki"
    }

}