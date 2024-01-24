import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedNoteModel } from '../databases/models/shared-Notes.model';
import { ShareController } from './controllers/sharing-notes.controller';
import { ShareService } from './services/sharing-notes.service';
import { NoteModel } from '../databases/models/note.model';
import { AuthModule } from 'src/authentication/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([SharedNoteModel]),
    SequelizeModule.forFeature([NoteModel]),
    AuthModule,
    JwtModule,
  ],
  controllers: [ShareController],
  providers: [ShareService],
  exports: [SequelizeModule, ShareService],
})
export class ShareModule {}
