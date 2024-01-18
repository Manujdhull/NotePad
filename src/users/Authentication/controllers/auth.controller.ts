import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/token.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
}
