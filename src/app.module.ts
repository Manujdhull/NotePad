import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './authentication/auth.module';
import { ShareController } from './sharing-notes/controllers/sharing-notes.controller';
import { SharingNotesModule } from './sharing-notes/sharingNotes.module';
import { JwtService } from '@nestjs/jwt';
import { MailModule } from './mail/mail.module';
import { DatabaseModule } from './databases/database.module';
import { EnvConfigModule } from './env-config/env-config.module';
import { ProfileStorageModule } from './profile-storage/profile-storage.module';
import { UserRepoModule } from './users/user-repo.module';
import { CliCommandModule } from './cli-commands/cli-command.module';
import { CommandModule } from 'nestjs-command';
import { LoggerMiddleware } from './app.middleware';
import { OAuthModule } from './googleOauth/oauth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    NotesModule,
    AuthModule,
    SharingNotesModule,
    MailModule,
    EnvConfigModule,
    DatabaseModule,
    ProfileStorageModule,
    UserRepoModule,
    CliCommandModule,
    CommandModule,
    OAuthModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController, ShareController],
  providers: [AppService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
