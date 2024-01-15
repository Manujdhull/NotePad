import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// import { Users } from './users';
// import {ValidationPipe} from './validation/validation.pipe'

@Module({
  // imports:[ValidationPipe],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
