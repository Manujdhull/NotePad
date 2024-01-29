import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Redirect,
  Render,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
// import { AuthGuard } from '../guard/auth.guard';
import { HashService } from '../services/hash.service';
import { UserDtoLogin } from '../../users/dtos/users.login.dto';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private hashService: HashService,
  ) {}

  // @HttpCode(HttpStatus.OK)
  @Post('login')
  // @Render('notes')
  public async signIn(
    @Body() userDtoLogin: UserDtoLogin,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    console.log(userDtoLogin);

    const token = await this.authService.signIn(
      userDtoLogin.username,
      userDtoLogin.password,
    );
    console.log('data of controller', token);
    response.cookie('authorization', token);
    // return data;
    response.redirect('./notes');
  }
  @Render('login')
  @Get('login')
  public async Display() {}

  @Post('logout')
  @Redirect('/login')
  public async signOut(@Res({ passthrough: true }) response: Response) {
    response.cookie('Authorization', '');
  }
}
