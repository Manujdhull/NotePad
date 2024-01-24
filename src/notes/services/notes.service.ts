import { NoteModel } from '../../databases/models/note.model';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NoteModel)
    private readonly notesModel: typeof NoteModel,
  ) { }

  /**
   * create notes of logged in user
   * @param id
   * @param data
   * @returns Promise<NotesModel>
   */
  public create(
    id: number,
    data: Pick<NoteModel, 'Title' | 'Body'>,
  ): Promise<NoteModel> {
    return this.notesModel.build().set(data).set({ userid: id }).save();
  }

  /**
   * getting all notes
   * @param id
   * @returns :Promise<NotesModel[]>
   */
  public getMyNotes(id: number): Promise<NoteModel[]> {
    return this.notesModel.findAll({
      where: {
        userid: id,
      },
    });
  }

  /**
   * find list of notes
   * @returns Promise<NotesModel[]
   */
  public findAll(): Promise<NoteModel[]> {
    return this.notesModel.findAll();
  }

  /**
   * find specigic notes by id
   * @param id
   * @returns Promise<NotesModel>
   */
  public findOne(id: number): Promise<NoteModel> {
    return this.notesModel.findByPk(id).then((data) => data || null);
  }

  /**
   * delete all notes of loggedIn user
   * @param id
   * @returns Promise<number>
   */
  public deleteAll(id: number): Promise<number> {
    return this.notesModel.destroy({
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
  public destroy(notes: NoteModel): Promise<void> {
    return notes.destroy();
  }

  public update(note: NoteModel, newContent: Partial<NoteModel>) {
    console.log(newContent);
    note.set( newContent ).save()
  }
}