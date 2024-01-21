import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  ValidationPipe,
  UsePipes,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDtoSignUp } from '../dtos/users.signup.dto';
import { MapToUserPipe } from '../pipes/map-to-user/map-to-user.pipe';
import { UserModel } from 'src/databases/models/user.model';

@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) { }
  // (transform:means structuring data as same of our dto)
  // whitelist true means ignoring extra data
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Post('signup')
  public async create(@Body() body: UserDtoSignUp): Promise<UserModel> {
    // return this.usersService.create(body.username, body.password);
    return this.usersService.createUser(body);
  }

  // fetching all the users list in table
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Get('list')
  public async findAll(): Promise<UserModel[]> {
    // console.log('abscd', this.usersService);
    return await this.usersService.findAll();
  }

  // fetching data with specific id
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Get(':id')
  public async findOne(
    @Param('id', ParseIntPipe, MapToUserPipe) user: UserModel,
  ): Promise<UserModel> {
    return user;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Delete(':id')
  public async destroy(
    @Param('id', ParseIntPipe, MapToUserPipe) user: UserModel,
  ): Promise<void> {
    return this.usersService.destroy(user);
  }
}
