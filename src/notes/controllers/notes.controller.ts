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
import { HttpStatus } from '@nestjs/common';
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
  ) { }

  /**
   *
   * @param notesModel
   * @returns : Promise<void>>
   */
  @UsePipes(new ValidationPipe({ transform: true }))
  @Render('notes')
  @Get()
  public async onDisplay(@AuthUser() userModel: UserModel) {
    const data = await this.notesService.getMyNotes(userModel.id);
    // console.log(data,"data");
    const shareData = await this.shareService.ShowSharedNotes(userModel.id);
    console.log('sharedData is this', shareData[0]);
    return { data: data, shareData: shareData };
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
    console.log('this is authuser id', authuser.id);
    console.log(notesDto);
    await this.notesService.create(authuser.id, notesDto);
  }

  /**
   * delete all the records of logged in user
   * @param id
   * @returns Promise<void>
   */
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async deleteAllNotes(@Param('id') id: number): Promise<void> {
    await this.notesService.deleteAll(id);
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
  ): Promise<void> {
    return await this.notesService.destroy(notes);
  }

  /**
   * update notes of logged in user
   * @param id
   * @param body
   * @returns
   */
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Put(':id/edit')
  @Redirect('/notes')
  public async editNote(
    @Param('id', ParseIntPipe, MapToUserNotesPipe) noteModel: NoteModel,
    @Body() body: NotesDto,
  ): Promise<void> {
    console.log('BODY JO USER SAE AARI', body.Body);
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
  public async updateDisplay(@Param('id') id: number):Promise<{data:NoteModel}> {
    const data = await this.notesService.findOne(id);
    console.log(data.dataValues, 'data');
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
    const users: UserModel[] = await this.userService.findAll();
    console.log(users);
    return { users, sharedNoteId };
  }
}