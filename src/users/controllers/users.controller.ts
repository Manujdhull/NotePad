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
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDtoSignUp } from '../dtos/users.signup.dto';
import { UserDtoLogin } from '../dtos/users.login.dto';
import { UsersList } from '../dtos/usersList.fetching.dto';
import { AuthService } from '../Authentication/services/token.service';
import { MapToUserPipe } from '../pipes/map-to-user/map-to-user.pipe';
import { UserModel } from 'src/databases/models/user.model';

@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}
  // (transform:means structuring data as same of our dto)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Post('signup')
  public async create(@Body() body: UserDtoSignUp): Promise<UserModel> {
    return this.usersService.signup(body.username, body.password);
  }

  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Post('signin')
  public signin(@Body() body: UserDtoLogin): Promise<UserModel> {
    return this.usersService.signin(body.username, body.password);
  }

  // fetching all the users list in table
  @UsePipes(new ValidationPipe())
  @Get('list')
  public async findAll(usersList: UsersList): Promise<string | object> {
    console.log('abscd', this.usersService);
    return this.usersService.findAll();
  }

  // fetching data with specific id
  @UsePipes(new ValidationPipe())
  @Get(':id')
  public async findOne(
    @Param('id', ParseIntPipe, MapToUserPipe) user: UserModel,
  ): Promise<UserModel> {
    return user;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  public async destroy(
    @Param('id', ParseIntPipe, MapToUserPipe) user: UserModel,
  ): Promise<void> {
    return this.usersService.destroy(user);
  }
}
