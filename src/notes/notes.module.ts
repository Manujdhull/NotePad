import { Module } from '@nestjs/common';
import { NotesController } from './controllers/notes.controller';
import { NotesService } from './services/notes.service';
import { NoteModel } from '../databases/models/note.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/authentication/auth.module';
import { AuthGuard } from 'src/authentication/guard/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([NoteModel]), AuthModule, JwtModule],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService, SequelizeModule],
})
export class NotesModule {}
