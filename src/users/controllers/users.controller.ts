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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDtoSignUp } from '../dtos/users.signup.dto';
import { MapToUserPipe } from '../pipes/map-to-user/map-to-user.pipe';
import { UserModel } from 'src/databases/models/user.model';
import { AuthGuard } from 'src/authentication/guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { UserDtoEmail } from '../dtos/users.email.dto';
import { AuthUser } from '../authUser.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
// import multer, { diskStorage } from 'multer';
const multer = require('multer');
import path, { extname } from 'path';
import { diskStorage } from 'multer';
// import { memoryStorage } from 'multer'

const storage=diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    var randomName = Array(32).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
    console.log(randomName);
    cb(null, `${randomName}${extname(file.originalname)}`)
  }
})
// middleware
// const Storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'Profiles')
//   },
//   filename(req, file, cb) {
//     console.log(file);
//     cb(null, Date.now() + path.extname(file.originalname))
//   },
// })

// const upload= multer({storage:Storage})

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) { }
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

  // @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @UseGuards(AuthGuard)
  @Get('profile')
  @Render('profile')
  public async showEmailDisplay() {
    console.log('my Email in hbs verifying email');
  }


  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @UseGuards(AuthGuard)
  @Post('profile')
  @UseInterceptors(FileInterceptor('file', {storage: storage})
  )
  @Redirect('/notes')
  public async verifyEmail(
    @AuthUser() authUser: UserModel,
    @Body() userDtoEmail: UserDtoEmail,
    @UploadedFile() file
  ): Promise<void> {
    console.log('my Email in hbs verifying email', userDtoEmail.Email);
    console.log("file we want to upload is this ", file.path)
    const profilePicture=String(file.path);
    console.log("file we want to upload is this ", profilePicture)
    if(!userDtoEmail.Email){
      this.usersService.createUserProfile( authUser.id,profilePicture);
    }
    else if(!(file)){
      this.usersService.createUserEmail(userDtoEmail.Email,authUser.id)
    }
    else{
      this.usersService.createUserEmailProfile(userDtoEmail.Email, authUser.id,profilePicture);
    }
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
