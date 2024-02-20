import { Module } from '@nestjs/common';
import { DestroyUserService } from './create-user/destroy-user.service';
import { UserRepoModule } from '../../users/user-repo.module';

@Module({
  imports: [UserRepoModule],
  providers: [DestroyUserService],
})
export class CliCommandModule {}
