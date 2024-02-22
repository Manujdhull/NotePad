import { NoteModel } from './note.model';
import { UserOauthModel } from './oauth-user.model';
import { SharedNoteModel } from './shared-Notes.model';
import { UserModel } from './user.model';

export const models: (
  | typeof UserModel
  | typeof NoteModel
  | typeof SharedNoteModel
  | typeof UserOauthModel
)[] = [UserModel, NoteModel, SharedNoteModel, UserOauthModel];
