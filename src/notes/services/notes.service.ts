import { NotesModel } from '../../databases/models/notes.model';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NotesModel)
    private readonly notesModel: typeof NotesModel,
  ) {}

  /**
   * create notes of logged in user
   * @param id
   * @param data
   * @returns Promise<NotesModel>
   */
  public async create(
    id: number,
    data: Pick<NotesModel, 'Title' | 'Body'>,
  ): Promise<NotesModel> {
    return this.notesModel.build().set(data).set({ userid: id }).save();
  }

  /**
   * find list of notes
   * @returns Promise<NotesModel[]
   */
  public async findAll(): Promise<NotesModel[]> {
    return this.notesModel.findAll();
  }

  /**
   * find specigic notes by id
   * @param id
   * @returns Promise<NotesModel>
   */
  async findOne(id: number): Promise<NotesModel> {
    return this.notesModel.findByPk(id).then((data) => data || null);
  }

  /**
   * delete all notes of loggedIn user
   * @param id
   * @returns Promise<number>
   */
  public async deleteAll(id: number): Promise<number> {
    return await this.notesModel.destroy({
      where: {
        userid: id,
      },
    });
  }

  /**
   * delete specific note of loggedIn user
   * @param notes
   * @returns Promise<void>
   */
  public async destroy(notes: NotesModel): Promise<void> {
    return notes.destroy();
  }

  /**
   * update logged In user notes details
   * @param userDataToUpdate
   * @param userNewData
   */
  public async updateRecord(
    userDataToUpdate: Pick<NotesModel, 'Title' | 'Body'>,
    userNewData: Pick<NotesModel, 'Title' | 'Body'>,
  ): Promise<void> {
    userDataToUpdate.Body = userNewData.Body;
    userDataToUpdate.Title = userNewData.Title;
  }
}
