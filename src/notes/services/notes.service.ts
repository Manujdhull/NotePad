import { Injectable } from '@nestjs/common';
// import { NotesController } from './notes.controller';
import { InjectModel } from '@nestjs/sequelize';
import { } from '../../databases/models/notes.model';
import { UserModel } from '../../databases/models/user.model';
import { NotesModel } from '../../databases/models/notes.model';

@Injectable()
export class NotesService {
    constructor(
        @InjectModel(UserModel)
        public userModel: typeof UserModel,
        public notesModel: typeof NotesModel
    ) { }

    public async create(Title: string, Body: string):Promise<NotesModel> {
        // const userName=this.userModel
        return this.notesModel
            .build()
            .setAttributes({ Title: Title, Body: Body })
            .save();
    }
}