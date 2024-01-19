import {
    ArgumentMetadata,
    Injectable,
    NotFoundException,
    PipeTransform,
  } from '@nestjs/common';
  import { NotesService } from '../../services/notes.service';
  
  @Injectable()
  export class MapToUserNotesPipe implements PipeTransform {
    constructor(private notesService: NotesService) {}
  
    transform(id: number, metadata: ArgumentMetadata) {
      const user = this.notesService.findOne(id);
      if (!user) {
        throw new NotFoundException();
      }
      return user;
    }
  }
  