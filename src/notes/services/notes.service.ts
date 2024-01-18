import { NotesModel } from '../../databases/models/notes.model';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotesDto } from '../dtos/create.notes.Body.Title.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NotesModel)
    private readonly notesModel: typeof NotesModel,
  ) {}

  public async findAll(): Promise<NotesModel[]> {
    return this.notesModel.findAll();
  }
  public async create(
    createNotesDto: NotesDto,
    id: number,
  ): Promise<NotesModel> {
    const title: string = createNotesDto.title;
    const body: string = createNotesDto.body;
    const user: NotesModel = await this.notesModel
      .build()
      .set({ title: title, body: body, userid: id })
      .save();
    return user;
  }
  public async deleteAll(id: number): Promise<number> {
    return await this.notesModel.destroy({
      where: {
        userid: id,
      },
    });
  }
  public async deleteNote(userid: number, id: number): Promise<number> {
    return await this.notesModel.destroy({
      where: {
        userid: userid,
        id: id,
      },
    });
  }
}
