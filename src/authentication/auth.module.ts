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
      signOptions: { expiresIn: '3d' },
      global: true,
    }),
  ],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
