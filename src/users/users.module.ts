import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UserRepoModule } from './user-repo.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { CheckUserExistsValidator } from './validations/checkUserExists.validation';
import { CheckPasswordMatchValidator } from './validations/checkPasswordMatch.validation';

@Module({
  imports: [UserRepoModule, NestjsFormDataModule],
  controllers: [UsersController],
  providers: [CheckPasswordMatchValidator, CheckUserExistsValidator],
})
export class UsersModule {}
