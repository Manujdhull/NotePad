import { Module } from '@nestjs/common';
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
  ],
  controllers: [AppController, ShareController],
  providers: [AppService, JwtService],
})
export class AppModule {}
