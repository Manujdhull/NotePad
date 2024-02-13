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
  Redirect,
  StreamableFile,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDtoSignUp } from '../dtos/users.signup.dto';
import { MapToUserPipe } from '../pipes/map-to-user/map-to-user.pipe';
import { UserModel } from 'src/databases/models/user.model';
import { AuthGuard } from 'src/authentication/guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { UserDtoEmail } from '../dtos/users.email.dto';
import { PictureDto } from '../dtos/users.picture.dto';
import { AuthUser } from '../authUser.decorator';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { Storage } from '@squareboat/nest-storage';
import { randomUUID } from 'crypto';
import { readFileSync } from 'fs';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  /**
   * creating new user
   * @param body
   * @returns : Promise<UserModel>
   */
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Post('signup')
  @Render('login')
  public async create(@Body() body: UserDtoSignUp): Promise<UserModel> {
    return this.usersService.createUser(body);
  }

  /**
   * funtion gives the user email & profilePicture
   * @param authUser
   * @returns :Promise<email:string,profile:string>
   */
  @UseGuards(AuthGuard)
  @Get('profile')
  @Render('profile')
  public async showEmailDisplay(
    @AuthUser() authUser: UserModel,
  ): Promise<{ email: string; profile: string }> {
    const email = authUser.Email;
    const profile = authUser.profilePicture;
    return { email, profile };
  }

  /**
   * Adding user Email into database
   * @param authUser
   * @param userDtoEmail
   * Return : Promise<void>
   */
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @Post('email')
  @Redirect('/notes')
  public async Email(
    @AuthUser() authUser: UserModel,
    @Body() userDtoEmail: UserDtoEmail,
  ): Promise<void> {
    this.usersService.createUserEmail(userDtoEmail.Email, authUser.id);
  }

  /**
   * Storing file at local
   * @param authUser
   * @param picture
   */
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @Redirect('/notes')
  @Post('profile')
  @FormDataRequest({ storage: FileSystemStoredFile })
  public async profile(
    @AuthUser() authUser: UserModel,
    @Body() picture: PictureDto,
  ): Promise<void> {
    const Path = `/profiles/${randomUUID()}.${picture.file.extension}`;
    await Storage.disk('local').put(Path, readFileSync(picture.file.path));
    await this.usersService.addImage(authUser, Path);
  }

  /**
   * showing picture at hbs page with the use of streamableFile
   * @param authUser
   * @returns :Promise<StreamableFile>
   */
  @UseGuards(AuthGuard)
  @Get('profile/picture')
  public async avatar(
    @AuthUser() authUser: UserModel,
  ): Promise<StreamableFile> {
    const picturePath: Buffer = await Storage.disk('local').get(
      authUser.profilePicture,
    );
    return new StreamableFile(picturePath, { disposition: 'inline' });
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
    //implementing custom pipes to find user
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
