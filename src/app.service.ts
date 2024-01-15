import { Injectable } from '@nestjs/common';
// import {UsersDto} from '../src/dto/users.dto'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
