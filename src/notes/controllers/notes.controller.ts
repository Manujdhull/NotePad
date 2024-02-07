import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  Post,
  Delete,
  UseGuards,
  Put,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Render,
  Redirect,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { NotesDto } from '../dtos/create.notes.Body.Title.dto';
import { NoteModel } from '../../databases/models/note.model';
import { AuthGuard } from 'src/authentication/guard/auth.guard';
import { UserModel } from 'src/databases/models/user.model';
import { AuthUser } from 'src/users/authUser.decorator';
import { MapToUserNotesPipe } from '../pipes/map-to-user/map-to-user.pipe';
import { UsersService } from 'src/users/services/users.service';
import { ShareService } from 'src/sharing-notes/services/sharing-notes.service';
import { ApiTags } from '@nestjs/swagger';
import { SharedNoteModel } from 'src/databases/models/shared-Notes.model';

@ApiTags('Notes')
@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(
    private notesService: NotesService,
    private userService: UsersService,
    private shareService: ShareService,
  ) {}

  /**
   *function to display notes
   * @param notesModel
   * @returns Promise<any>
   */
  @UsePipes(new ValidationPipe())
  @Render('notes')
  @Get()
  public async DataOnDisplayNotes(
    @Query('shared') shared: string,
    @AuthUser() userModel: UserModel,
  ): Promise<any> {
    const notesData: NoteModel[] = await this.notesService.getMyNotes(
      userModel.id,
    );
    const userData: UserModel = await this.userService.findOne(userModel.id);
    const checkingEmailPresent: string = userData.Email;
    const shareData: SharedNoteModel[] =
      await this.shareService.ShowSharedNotes(userModel.id);

    if (shared === 'createdByMe') {
      return { data: notesData, VerifyEmail: checkingEmailPresent };
    } else if (shared === 'sharedWithMe') {
      return { shareData: shareData, VerifyEmail: checkingEmailPresent };
    }
    return {
      data: notesData,
      shareData: shareData,
      VerifyEmail: checkingEmailPresent,
    };
  }

  /**
   * getting notes by id
   * @param id
   * @returns Promise<NotesModel>
   */
  @UsePipes(new ValidationPipe())
  @Get(':id')
  findOne(@Param('id') id: number): Promise<NoteModel> {
    return this.notesService.findOne(id);
  }

  /**
   * create notes
   * @param notesDto
   * @param authuser
   * @returns Promise<NotesModel>
   */
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Post()
  @Redirect('/notes')
  async create(
    @Body() notesDto: NotesDto,
    @AuthUser() authuser: UserModel,
  ): Promise<void> {
    await this.notesService.create(authuser.id, notesDto);
  }

  /**
   * delete notes by id
   * @param id
   * @returns Promise<number>
   */
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Delete()
  @Redirect('notes')
  public deleteNote(
    @Body('id', ParseIntPipe, MapToUserNotesPipe) notes: NoteModel,
  ): Promise<number> {
    return this.notesService.deleteNote(notes.userid, notes.id);
  }

  /**
   * update notes of logged in user
   * @param id
   * @param body
   * @returns
   */
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Put(':id')
  @Redirect('/notes')
  public editNote(
    @Param('id', ParseIntPipe, MapToUserNotesPipe) noteModel: NoteModel,
    @Body() body: NotesDto,
  ): void {
    this.notesService.update(noteModel, body);
  }

  /**
   * function to edit Notes
   * @param id
   * @returns Promise<{data:NoteModel}>
   */
  @UsePipes(new ValidationPipe())
  @Render('update')
  @Get(':id/edit')
  public async updateDisplay(
    @Param('id') id: number,
  ): Promise<{ data: NoteModel }> {
    const data: NoteModel = await this.notesService.findOne(id);
    return { data: data };
  }

  /**
   * function to getting userNames of users
   * @param sharedNoteId
   * @returns Promise<object>
   */
  @UsePipes(new ValidationPipe())
  @Get(':id/share')
  @Render('share')
  public async openShare(@Param('id') sharedNoteId: number): Promise<object> {
    const data: UserModel[] = await this.userService.findAll();
    const sameUserWhoShare: NoteModel =
      await this.notesService.findOne(sharedNoteId);
    const users: UserModel[] = data.filter(
      (data: UserModel): boolean => data.id !== sameUserWhoShare.userid,
    );
    return { users, sharedNoteId };
  }
}
