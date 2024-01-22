import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UserRepoModule } from './user-repo.module';
import { MapToUserPipe } from './pipes/map-to-user/map-to-user.pipe';

@Module({
  imports: [UserRepoModule],
  controllers: [UsersController],
})
export class UsersModule {}
