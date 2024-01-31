import { Module } from '@nestjs/common';
import { NotesController } from './controllers/notes.controller';
import { NotesService } from './services/notes.service';
import { NoteModel } from '../databases/models/note.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/authentication/auth.module';
import { AuthGuard } from 'src/authentication/guard/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { UserModel } from 'src/databases/models/user.model';
import { UsersModule } from 'src/users/users.module';
import { UserRepoModule } from 'src/users/user-repo.module';
import { ShareModule } from 'src/sharing-notes/sharing-notes.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([NoteModel]),
    AuthModule,
    JwtModule,
    UserRepoModule,
    ShareModule,
    MailModule,
  ],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService, SequelizeModule],
})
export class NotesModule {}
