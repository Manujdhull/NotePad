import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { NotesService } from '../../services/notes.service';
import { NoteModel } from 'src/databases/models/note.model';

@Injectable()
export class MapToUserNotesPipe implements PipeTransform {
  constructor(private notesService: NotesService) {}

  /**
   * function returning user exist or not
   * @param id
   * @param metadata
   * @returns Promise<NoteModel>
   */
  transform(id: number): Promise<NoteModel> {
    const eid: number = Number(id);
    const user: Promise<NoteModel> = this.notesService.findOne(eid);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
