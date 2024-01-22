import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/databases/models/user.model';
import { CheckPasswordMatchValidator } from './Validations/checkPasswordMatch.validation';
import { CheckUserExistsValidator } from './Validations/checkUserExists.validation';
import { HashRepoModule } from 'src/authentication/hash-repo.module';

@Module({
  imports: [SequelizeModule.forFeature([UserModel]), HashRepoModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    CheckPasswordMatchValidator,
    CheckUserExistsValidator,
  ],
  exports: [UsersService],
})
export class UserRepoModule {}
