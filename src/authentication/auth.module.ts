import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserRepoModule } from '../users/user-repo.module';
import { AuthService } from './services/auth.service';
import { HashRepoModule } from './hash-repo.module';

// @Global()
@Module({
  imports: [
    UserRepoModule,
    HashRepoModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
