import { Injectable, Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../databases/models/user.model';
import { AuthService } from './Authentication/services/token.service';
import { CheckUserExistsValidator } from './Validations/checkUserExists.validation';
import { HashService } from './Authentication/services/hash.service';
import { JwtService } from '@nestjs/jwt';
// import { Users } from './users';
// import {ValidationPipe} from './validation/validation.pipe'

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UsersController],
  providers: [UsersService, HashService, AuthService, CheckUserExistsValidator,JwtService],
  exports: [UsersService, SequelizeModule],
})
export class UsersModule {}
