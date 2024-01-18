import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../databases/models/user.model';
import { CheckUserExistsValidator } from './Validations/checkUserExists.validation';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './Authentication/auth.module';
import { UserRepoModule } from './user-repo.module';
// import { Users } from './users';
// import {ValidationPipe} from './validation/validation.pipe'

@Module({
  imports: [SequelizeModule.forFeature([UserModel]), AuthModule, UserRepoModule],
  controllers: [UsersController],
  providers: [CheckUserExistsValidator, JwtService],
  exports: [SequelizeModule],
})
export class UsersModule { }
