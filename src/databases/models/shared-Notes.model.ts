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
  public senId: number;

  @ForeignKey(() => UserModel)
  @Column
  public sharedNoteId: number;

  @PrimaryKey
  @Column
  public id: number;

  @Column
  public createdAt: Date;

  @Column
  public updatedAt: Date;

  @BelongsTo(() => UserModel, {
    foreignKey: 'senId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
  })
  public sender: UserModel[];

  @BelongsTo(() => NoteModel, {
    foreignKey: 'sharedNoteId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
  })
  public notes: NoteModel[];
}
