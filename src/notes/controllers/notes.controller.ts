import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  Post,
  Delete,
  Response,
  Request,
  UseGuards,
  Put,
  HttpCode,
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
   *
   * @param notesModel
   * @returns : Promise<void>>
   */
  @UsePipes(new ValidationPipe({ transform: true }))
  @Render('notes')
  @Get()
  public async DataOnDisplayNotes(
    @Query('shared') shared: string,
    @AuthUser() userModel: UserModel,
  ) {
    // console.log(await this.notesService.getMyNotes(userModel.id))
    const notesData = await this.notesService.getMyNotes(userModel.id);
    // console.log(notesData, "data", "is of user", userModel.id);

    const userData = await this.userService.findOne(userModel.id);
    // const userData = this.userService.findOne(notesData[0].userid);
    // console.log("user ka data", (await userData).Email);

    const checkingEmailPresent = (await userData).Email;
    const shareData = await this.shareService.ShowSharedNotes(userModel.id);

    if (shared === 'createdByMe') {
      return { data: notesData, VerifyEmail: checkingEmailPresent };
    } else if (shared === 'sharedWithMe') {
      return { shareData: shareData, VerifyEmail: checkingEmailPresent };
    }
    // console.log('sharedData is this', shareData[0]);
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
  @UsePipes(new ValidationPipe({ transform: true }))
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
  @Post('write')
  @Redirect('/notes')
  async create(
    @Body() notesDto: NotesDto,
    @AuthUser() authuser: UserModel,
  ): Promise<void> {
    // console.log('this is authuser id', authuser.id);
    // console.log("user sae aaya hua data", notesDto);
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
  public async deleteNote(
    @Body('id', ParseIntPipe, MapToUserNotesPipe) notes: NoteModel,
    @AuthUser() authUser: UserModel,
  ): Promise<number> {
    return await this.notesService.deleteNote(notes.userid, notes.id);
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
  public async editNote(
    @Param('id', ParseIntPipe, MapToUserNotesPipe) noteModel: NoteModel,
    @Body() body: NotesDto,
  ): Promise<void> {
    // console.log('BODY JO USER SAE AARI', body.Body);
    await this.notesService.update(noteModel, body);
  }

  /**
   * function to edit Notes
   * @param id
   * @returns Promise<{data:NoteModel}>
   */
  @UsePipes(new ValidationPipe({ transform: true }))
  @Render('update')
  @Get(':id/edit')
  public async updateDisplay(
    @Param('id') id: number,
  ): Promise<{ data: NoteModel }> {
    const data = await this.notesService.findOne(id);
    // console.log(data.dataValues, 'data');
    return { data: data };
  }

  /**
   * function to getting userNames of users
   * @param sharedNoteId
   * @returns Promise<object>
   */
  @Get(':id/share')
  @Render('share')
  public async openShare(@Param('id') sharedNoteId: number): Promise<object> {
    const data: UserModel[] = await this.userService.findAll();
    const sameUserWhoShare = await this.notesService.findOne(sharedNoteId);
    console.log('ye hae users ki id', sameUserWhoShare.userid);
    // console.log("smjha janna",data[0],"user ka data hae ye jo share mae ja rha h")
    const users = data.filter((data) => data.id !== sameUserWhoShare.userid);
    return { users, sharedNoteId };
  }
}
