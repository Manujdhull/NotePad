import { Module } from '@nestjs/common';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { SharedNoteModel } from '../databases/models/shared-Notes.model';
import { ShareController } from './controllers/sharing-notes.controller';
import { ShareService } from './services/sharing-notes.service';
// import { NoteModel } from '../databases/models/note.model';
import { AuthModule } from 'src/authentication/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserRepoModule } from 'src/users/user-repo.module';

@Module({
  imports: [
    // SequelizeModule.forFeature([SharedNoteModel]),
    // SequelizeModule.forFeature([NoteModel]),
    AuthModule,
    JwtModule,
    UserRepoModule,
  ],
  controllers: [ShareController],
  providers: [ShareService],
  exports: [
    // SequelizeModule,
    ShareService,
  ],
})
export class SharingNotesModule {}
