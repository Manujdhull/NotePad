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
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { NotesDto } from '../dtos/create.notes.Body.Title.dto';
import { NotesModel } from '../../databases/models/notes.model';
import { AuthGuard } from 'src/authentication/guard/auth.guard';
import { UserModel } from 'src/databases/models/user.model';
import { AuthUser } from 'src/users/authUser.decorator';
import { MapToUserNotesPipe } from '../pipes/map-to-user/map-to-user.pipe';

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

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
    return { data: data };
    // console.log("hello")
  }

  public async findAll(notesModel: NotesModel): Promise<void> {
    console.log('hello');
  }

  /**
   * getting notes by id
   * @param id
   * @returns Promise<NotesModel>
   */
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get(':id')
  findOne(@Param('id') id: number): Promise<NotesModel> {
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
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async deleteNote(
    @Param('id', ParseIntPipe, MapToUserNotesPipe) notes: NotesModel,
  ): Promise<void> {
    return await this.notesService.destroy(notes);
  }

  /**
   *
   * @param id
   * @param body
   * @returns
   */
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Put(':id')
  public async editNote(
    @Param('id', ParseIntPipe, MapToUserNotesPipe) notes: NotesModel,
    @Body() body: NotesDto,
  ): Promise<void> {
    return await this.notesService.updateRecord(notes, body);
  }
}
function Redirect(
  arg0: string,
): (
  target: NotesController,
  propertyKey: 'findAll',
  descriptor: TypedPropertyDescriptor<
    (notesModel: NotesModel) => Promise<NotesModel[]>
  >,
) => void | TypedPropertyDescriptor<
  (notesModel: NotesModel) => Promise<NotesModel[]>
> {
  throw new Error('Function not implemented.');
}
