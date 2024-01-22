import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user/signup')
  @Render('signup')
  signup(@Res() res: Response) {
    return { message: 'Hello world!' };
  }

  @Get('user/login')
  @Render('login')
  login() {
    return { message: 'Hello world!' };
  }
}
