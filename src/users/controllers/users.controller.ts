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
  Render,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDtoSignUp } from '../dtos/users.signup.dto';
import { MapToUserPipe } from '../pipes/map-to-user/map-to-user.pipe';
import { UserModel } from 'src/databases/models/user.model';
import { AuthGuard } from 'src/authentication/guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  // (transform:means structuring data as same of our dto)
  // whitelist true means ignoring extra data
  /**
   * creating new user
   * @param body 
   * @returns : Promise<UserModel>
   */
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Post('signUp')
  @Render('login')
  public async create(@Body() body: UserDtoSignUp): Promise<UserModel> {
    console.log('my body in hbs sign up', body);
    // return this.usersService.create(body.username, body.password);
    return this.usersService.createUser(body);
  }

  /**
   * list all the users
   * @returns : Promise<UserModel[]>
   */
  @UseGuards(AuthGuard)
  // fetching all the users list in table
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Get('list')
  public async findAll(): Promise<UserModel[]> {
    // console.log('abscd', this.usersService);
    return await this.usersService.findAll();
  }

  /**
   * find one user with id
   * @param user 
   * @returns : Promise<UserModel>
   */
  @UseGuards(AuthGuard)
  // fetching data with specific id
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Get(':id')
  public async findOne(
    @Param('id', ParseIntPipe, MapToUserPipe) user: UserModel,
  ): Promise<UserModel> {
    return user;
  }

  /**
   * delete user with their id
   * @param user 
   * @returns : Promise<Void>
   */
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Delete(':id')
  public async destroy(
    @Param('id', ParseIntPipe, MapToUserPipe) user: UserModel,
  ): Promise<void> {
    return this.usersService.destroy(user);
  }
}