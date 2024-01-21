

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShareDto } from '../../databases/models/shared-Notes.model';
import { NotesModel } from '../../databases/models/notes.model';

@Injectable()
export class ShareService {
    constructor(
        @InjectModel(ShareDto)
        private sharedModel: typeof ShareDto,
        @InjectModel(NotesModel)
        private notesModel: typeof NotesModel,
    ) { }

    public async sharingNote(data: Pick<ShareDto, 'shared_note_id' | 'shared_to_user_id'>, user_id: number): Promise<ShareDto | string> {
        const shared_by_user_id = await this.sharedModel.findOne({
            where: {
                shared_note_id: data.shared_note_id
            }
        });
        if (Number(shared_by_user_id) === user_id) {
            return this.sharedModel.build().set(data).save();
        }
        else {
            return "You don't have access to this note";
        }
    }
    public async findAllSharedNotes(): Promise<SharedNoteModel[]> {
        return this.sharedModel.scope('withnoteuser').findAll();
    }

    public async ShowSharedToMeNotes(user_id: number) {
        return this.sharedModel.scope('withnoteuser').findAll(
            {
                attributes: ["note.title", "note.body"],
                where: {
                    shared_to_user_id: user_id
                }
            });
    }
}

