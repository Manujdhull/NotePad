import { Module } from '@nestjs/common';
import { AuthService } from './services/token.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from '../users.module';
import { JwtModule } from '@nestjs/jwt';
import { HashService } from './services/hash.service';
import { jwtConstants } from './constants/auth.constant';
import { UserRepoModule } from '../user-repo.module';

@Module({
  imports: [JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }), UserRepoModule],
  providers: [HashService, AuthService],
  controllers: [AuthController],
  exports: [HashService, AuthService],
})
export class AuthModule { }