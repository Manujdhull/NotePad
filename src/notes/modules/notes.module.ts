import { Module } from '@nestjs/common';
import { NotesController } from '../controllers/notes.controller';
import { NotesService } from '../services/notes.service';
import { NotesModel } from '../../databases/models/notes.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([NotesModel])],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService, SequelizeModule],
})
export class NotesModule {}
