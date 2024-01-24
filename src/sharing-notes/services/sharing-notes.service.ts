import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShareDto } from '../dtos/sharing-notes.dto'
import { NoteModel } from '../../databases/models/note.model';
import { SharedNoteModel } from '../../databases/models/shared-Notes.model';
@Injectable()
export class ShareService {
  constructor(
    @InjectModel(SharedNoteModel)
    private sharedModel: typeof SharedNoteModel,
    @InjectModel(NoteModel)
    private notesModel: typeof NoteModel,
  ) { }

  public async sharingNote(data: Pick<SharedNoteModel, 'sharedNoteId' | 'sharedToUserId'>,user_id: number,
  ): Promise<SharedNoteModel | string> {
    const shared_by_user_id = await this.sharedModel.findOne({
      where: {
        sharedNoteId: data.sharedNoteId,
      },
    });
    if (Number(shared_by_user_id) === user_id) {
      return this.sharedModel.build().set(data).save();
    } else {
      return "Accessed Denied!!";
    }
  }

  public async findAllSharedNotes(): Promise<SharedNoteModel[]> {
    return this.sharedModel.scope('UserNotesScope').findAll();
  }

  public async ShowSharedNotes(id: number) {
    return this.sharedModel.scope('UserNotesScope').findAll({
      attributes: ['note.Title', 'note.Body'],
      where: {
        sharedToUserId: id,
      },
    });
  }
}