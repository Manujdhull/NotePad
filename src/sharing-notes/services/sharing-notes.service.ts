import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
// import { ShareDto } from '../dtos/sharing-notes.dto'
import { NoteModel } from '../../databases/models/note.model';
import { SharedNoteModel } from '../../databases/models/shared-Notes.model';
@Injectable()
export class ShareService {
  constructor(
    @InjectModel(SharedNoteModel)
    private sharedModel: typeof SharedNoteModel,
    @InjectModel(NoteModel)
    private notesModel: typeof NoteModel,
  ) {}

  /**
   * function to share notes
   * @param data 
   * @param user_id 
   * @returns Promise<SharedNoteModel>
   */
  public async sharingNote(
    data: Pick<SharedNoteModel, 'senId' | 'sharedNoteId'>,
    user_id: number,
  ): Promise<SharedNoteModel> {
    return this.sharedModel.build().set(data).save();
  }

  /**
   * Function to show notes shared to me
   * @param user_id
   * @returns : Promise<SharedNoteModel[]>
   */
  public async ShowSharedNotes(user_id: number): Promise<SharedNoteModel[]> {
    return this.sharedModel.scope('UserNotesScope').findAll({
      attributes: ['notes.Title', 'notes.Body', 'notes.id'],
      where: {
        senId: user_id,
      },
      raw: true,
    });
  }
}
