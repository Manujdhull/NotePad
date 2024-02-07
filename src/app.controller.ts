import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user/signup')
  @Render('signup')
  signup(): { message: string } {
    return { message: 'Hello world!' };
  }
}
