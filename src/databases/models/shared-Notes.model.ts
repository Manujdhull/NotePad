import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { NoteModel } from './note.model';
import { UserModel } from './user.model';

@Scopes(() => ({
  UserNotesScope: {
    include: NoteModel,
  },
}))
@Table({ tableName: 'SharedNotes' })
export class SharedNoteModel extends Model {
  @ForeignKey(() => NoteModel)
  @Column
  public sharedNoteId: number;

  @ForeignKey(() => UserModel)
  @Column
  public sharedToUserId: number;

  @PrimaryKey
  @Column
  public id: number;

  @Column
  public createdAt: Date;

  @Column
  public updatedAt: Date;

}
