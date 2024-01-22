import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShareDto } from '../dtos/sharing-notes.dto';
import { NotesModel } from '../../databases/models/notes.model';
import { SharedNoteModel } from '../../databases/models/shared-Notes.model';
@Injectable()
export class ShareService {
  constructor(
    @InjectModel(SharedNoteModel)
    private sharedModel: typeof SharedNoteModel,
    @InjectModel(NotesModel)
    private notesModel: typeof NotesModel,
  ) {}

  public async sharingNote(
    data: Pick<SharedNoteModel, 'sharedNoteId' | 'sharedToUserId'>,
    user_id: number,
  ): Promise<SharedNoteModel | string> {
    const shared_by_user_id = await this.sharedModel.findOne({
      where: {
        shared_note_id: data.sharedNoteId,
      },
    });
    if (Number(shared_by_user_id) === user_id) {
      return this.sharedModel.build().set(data).save();
    } else {
      return "You don't have access to this note";
    }
  }
  public async findAllSharedNotes(): Promise<SharedNoteModel[]> {
    return this.sharedModel.scope('withnoteuser').findAll();
  }

  public async ShowSharedNotes(user_id: number) {
    return this.sharedModel.scope('withnoteuser').findAll({
      attributes: ['note.title', 'note.body'],
      where: {
        shared_to_user_id: user_id,
      },
    });
  }
}
