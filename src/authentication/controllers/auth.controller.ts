import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Redirect,
  Render,
  Res,
} from '@nestjs/common';
import { UserDtoLogin } from '../../users/dtos/users.login.dto';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Function for signup user can login
   * @param userDtoLogin
   * @param response
   * @returns Promise<void>
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async signIn(
    @Body() userDtoLogin: UserDtoLogin,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const token: string | { access_token: string } =
      await this.authService.signIn(
        userDtoLogin.username,
        userDtoLogin.password,
      );
    //set cookie in response for checking further same user
    response.cookie('authorization', token);
    response.redirect('./notes');
  }

  /**
   * function for dislplay login page
   * @returns Promise<void
   */
  @HttpCode(HttpStatus.OK)
  @Render('login')
  @Get('login')
  public async Display(): Promise<void> {}

  /**
   * function can logout with set cookie empty
   * @param response
   * @returns :Promise<void>
   */
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @Redirect('/login')
  public async signOut(
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    response.cookie('Authorization', '');
  }
}
