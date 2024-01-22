import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Redirect,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { HashService } from '../services/hash.service';
import { UserDtoLogin } from '../../users/dtos/users.login.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private hashService: HashService,
  ) {}

  // @HttpCode(HttpStatus.OK)
  @Post('signin')
  public async signIn(@Body() userDtoLogin: UserDtoLogin) {
    console.log(userDtoLogin);

    const data = await this.authService.signIn(
      userDtoLogin.username,
      userDtoLogin.password,
    );
    console.log('data of controller', data);
    return data;
  }

  @UseGuards(AuthGuard)
  @Get('')
  public getProfile(@Request() req: any): any {
    return req.user;
  }
}
