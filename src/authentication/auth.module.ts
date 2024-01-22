import { Global, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants/auth.constants';
import { UserRepoModule } from '../users/user-repo.module';
import { AuthService } from './services/auth.service';
import { HashRepoModule } from './hash-repo.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';

// @Global()
@Module({
  imports: [
    UserRepoModule,
    HashRepoModule,
    JwtModule.register({
      // global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '360s' },
    }),
    // JwtModule.registerAsync({
    //   useFactory: async () => ({
    //     secretOrPrivateKey: process.env.secretKey,
    //     },
    //   }),
    // }),
  ],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
