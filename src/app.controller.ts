import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user/signup')
  @Render('signup')
  signup(): { message: string } {
    return { message: 'Hello world!' };
  }

  // @Get('user/login')
  // @Render('login')
  // login():{message:string} {
  //   return { message: 'Hello world!' };
  // }
}
