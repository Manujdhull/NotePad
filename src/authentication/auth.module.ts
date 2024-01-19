import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants/auth.constant';
import { UserRepoModule } from '../users/user-repo.module';
import { AuthService } from './services/auth.service'
import { HashRepoModule } from './hash-repo.module';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '3600s' },
  }), UserRepoModule, HashRepoModule],
  providers: [AuthService,JwtService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }