import { NoteModel } from '../../databases/models/note.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SharedNoteModel } from 'src/databases/models/shared-Notes.model';
import { UserModel } from 'src/databases/models/user.model';
import { UsersService } from '../../users/services/users.service';
import { ShareService } from 'src/sharing-notes/services/sharing-notes.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NoteModel)
    private readonly notesModel: typeof NoteModel,
    private readonly usersService: UsersService,
    private readonly shareService: ShareService,
    private readonly mailService: MailService,
  ) {}

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
      raw: true,
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
   * delete specific note of loggedIn user
   * @param notes
   * @returns Promise<void>
   */
  public destroy(notes: NoteModel): Promise<void> {
    return notes.destroy();
  }

  /**
   * function update notes
   * @param note
   * @param newContent
   */
  public update(note: NoteModel, newContent: Partial<NoteModel>) {
    // console.log(newContent);
    note.set(newContent).save();
  }

  public async deleteNote(userid: number, id: number): Promise<number> {
    const note: NoteModel = await this.notesModel.findOne({
      where: {
        id: id,
        userid: userid,
      },
    });
    const bodyOfNote: string = note.Body;
    const titleOfNote: string = note.Body;
    const UsernameOfnoteOwner: string = (
      await this.usersService.findOne(userid)
    ).username;
    // console.log("usser name of note original user",UsernameOfnoteOwner) //return username
    const sharedToUser: SharedNoteModel =
      await this.shareService.getSharedToUserId(id);
    // console.log("shared to user",sharedToUser )
    console.log(
      'shared to user email check',
      await this.usersService.findOne(sharedToUser.senId),
    );

    const EmailOfuserNoteSharedWithWhom: string = (
      await this.usersService.findOne(sharedToUser.senId)
    ).Email;
    await this.mailService.sendDeleteNoteMsg(
      bodyOfNote,
      titleOfNote,
      EmailOfuserNoteSharedWithWhom,
      UsernameOfnoteOwner,
    );
    return this.notesModel.destroy({
      where: {
        userid: userid,
        id: id,
      },
    });
  }
}
