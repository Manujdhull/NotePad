import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
// import {} from './'

@Module({
  // import:[],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}
