import { NotesModel } from '../../databases/models/notes.model';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotesDto } from '../dtos/create.notes.Body.Title.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NotesModel)
    private readonly notesModel: typeof NotesModel,
  ) { }

  /**
   * create notes of logged in user
   * @param id 
   * @param data 
   * @returns Promise<NotesModel>
   */
  public async create(id: number, data: Pick<NotesModel, 'Title' | 'Body'>):Promise<NotesModel> {
    return this.notesModel.build().set(data).set({ userid: id }).save();
  }

  /**
   * find list of notes
   * @returns Promise<NotesModel[]
   */
  public async findAll(): Promise<NotesModel[]> {
    return this.notesModel.findAll();
  }

  // public async findOne(id): Promise<NotesModel> {
  //   return this.notesModel.findByPk(id);
  // }

  async findOne(id: number):Promise<NotesModel> {
    return this.notesModel
      .findByPk(id)
      .then((data) => (data || null));
  }

  public async deleteAll(id: number): Promise<number> {
    return await this.notesModel.destroy({
      where: {
        userid: id,
      },
    });
  }

  public async destroy(notes:NotesModel): Promise<void> {
    return notes.destroy();
  }

  public async updateRecord(userDataToUpdate:Pick<NotesModel,'Title'|'Body'>,userNewData:Pick<NotesModel,'Title'|'Body'>):Promise<void>{
    userDataToUpdate.Body=userNewData.Body
    userDataToUpdate.Title=userNewData.Title
  }
}