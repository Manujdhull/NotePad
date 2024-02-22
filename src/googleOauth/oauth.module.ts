import { Module } from '@nestjs/common';
import { AuthController } from './oauth.controller';
import { AuthService } from './oauth.service';
import { GoogleStrategy } from './util/google-strategy';
import { SessionSerializer } from './util/serializer';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserOauthModel } from '../databases/models/oauth-user.model';

@Module({
  imports: [SequelizeModule.forFeature([UserOauthModel])],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
})
export class OAuthModule {}
