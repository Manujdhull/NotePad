import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GoogleAuthGuard } from './util/guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('authentication google')
@Controller('auth')
export class AuthController {
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  // api/auth/google/redirect
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  handleRedirect() {
    console.log('hello handleRedirect');
    return { msg: 'OK' };
  }

  @Get('status')
  user(@Req() request: Request) {
    console.log('user from the request', request);
    if (request.session.id) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }
}
