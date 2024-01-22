import { Global, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants/auth.constants';
import { UserRepoModule } from '../users/user-repo.module';
import { AuthService } from './services/auth.service';
import { HashRepoModule } from './hash-repo.module';

@Global()
@Module({
  imports: [
    UserRepoModule,
    JwtModule.register({
      global: true,
      secretOrPrivateKey: jwtConstants.secret,
      signOptions: { expiresIn: '360s' },
    }),
    // JwtModule.registerAsync({
    //   useFactory: async () => ({
    //     secretOrPrivateKey: process.env.secretKey,
    //     },
    //   }),
    // }),
    HashRepoModule,
  ],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
