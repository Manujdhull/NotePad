import { Injectable, Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../../databases/models/user.model';
import { AuthService } from '../Authentication/auth.service';
// import { Users } from './users';
// import {ValidationPipe} from './validation/validation.pipe'

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService, SequelizeModule],
})
export class UsersModule {}
