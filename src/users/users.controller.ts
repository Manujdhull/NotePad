import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  ValidationPipe,
  UsePipes,
  Param,
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDtoSignUp } from './dto/users.signup.dto';
// import { UserModel } from 'src/databases/users.model/user.model';
// import { UsersList } from './dto/usersList.fetching.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // using pipe for validations WhiteList True ignore extra data
  // (transform:means structuring data as same of our dto)

  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Post('signUp')
  async create(@Body() userDtoSignUp: UserDtoSignUp): Promise<object | string> {
    console.log(userDtoSignUp instanceof UserDtoSignUp);
    return this.usersService.create(userDtoSignUp);
  }

  // fetching all the users list in table
  @UsePipes(new ValidationPipe())
  @Get('List')
  async findAll(): Promise<string | object> {
    console.log('abscd', this.usersService);
    // return this.usersService.create();
    return this.usersService.findAll();
  }

  // fetching data with specific id
  @UsePipes(new ValidationPipe())
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<string | object> {
    // console.log('abscd', this.usersService);
    // console.log("my id",id);
    const data = await this.usersService.findOne(id);
    return data;
  }

  @UsePipes(new ValidationPipe())
  @Delete(':id')
  async destroy(@Param('id') id: string): Promise<string | number> {
    console.log('DESTROY DATA', id);
    return await this.usersService.destroy(id);
  }
}
