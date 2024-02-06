import { Module } from '@nestjs/common';
import { NotesController } from './controllers/notes.controller';
import { NotesService } from './services/notes.service';
import { NoteModel } from '../databases/models/note.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/authentication/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserRepoModule } from 'src/users/user-repo.module';
import { SharingNotesModule } from 'src/sharing-notes/sharingNotes.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([NoteModel]),
    AuthModule,
    JwtModule,
    UserRepoModule,
    SharingNotesModule,
    MailModule,
  ],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService, SequelizeModule],
})
export class NotesModule {}
