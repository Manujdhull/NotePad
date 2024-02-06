import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/databases/models/user.model';
import { HashRepoModule } from 'src/authentication/hash-repo.module';
import { ProfileStorageModule } from 'src/profile-storage/profile-storage.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    HashRepoModule,
    ProfileStorageModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserRepoModule {}
