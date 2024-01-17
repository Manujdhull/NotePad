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
  Headers
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDtoSignUp } from '../dtos/users.signup.dto';
import { UserDtoLogin } from '../dtos/users.login.dto';
import { UsersList } from '../dtos/usersList.fetching.dto';
import { AuthService } from '../Authentication/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  // (transform:means structuring data as same of our dto)

  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Post('signUp')
  async create(@Body() body: UserDtoSignUp): Promise<object | string> {
    return this.authService.signup(body.username, body.password);
  }

  @Post('signin')
  signin(@Body() body: UserDtoLogin): Promise<object> {
    return this.authService.signin(body.username, body.password);
  }

  // fetching all the users list in table
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Get('List')
  async findAll(usersList: UsersList): Promise<string | object> {
    console.log('abscd', this.usersService);
    return this.usersService.findAll();
  }

  // fetching data with specific id
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<string | object> {
    const data = await this.usersService.findOne(id);
    return data;
  }

  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Delete(':id')
  async destroy(@Param('id') id: string): Promise<string | number> {
    console.log('DESTROY DATA', id);
    return await this.usersService.destroy(id);
  }
}
