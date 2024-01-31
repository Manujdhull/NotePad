import { NoteModel } from './note.model';
import { SharedNoteModel } from './shared-Notes.model';
import { UserModel } from './user.model';

export const models: (
  | typeof UserModel
  | typeof NoteModel
  | typeof SharedNoteModel
)[] = [UserModel, NoteModel, SharedNoteModel];
