import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { NotesModel } from './notes.model';
import { UserModel } from './user.model';

@Scopes(() => ({
  withnoteuser: {
    include: NotesModel,
  },
}))
@Table({ tableName: 'SharedNotes' })
export class SharedNoteModel extends Model {
  @ForeignKey(() => NotesModel)
  @Column
  public sharedNoteId: number;

  @ForeignKey(() => UserModel)
  @Column
  public sharedToUserId: number;

  @PrimaryKey
  @Column
  id: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
