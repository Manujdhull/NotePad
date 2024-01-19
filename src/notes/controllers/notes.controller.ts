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
  ParseIntPipe
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
  constructor(private notesService: NotesService) { }

  /**
   * 
   * @param notesModel 
   * @returns Promise<NotesModel[]>
   */
  @Get()
  findAll(notesModel: NotesModel): Promise<NotesModel[]> {
    return this.notesService.findAll();
  }

  /**
   * getting notes by id
   * @param id 
   * @returns Promise<NotesModel>
   */
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
  @Post('write')
  async create(@Body() notesDto: NotesDto, @AuthUser() authuser: UserModel): Promise<NotesModel> {
    console.log("this is authuser id", authuser.id)

    return this.notesService.create(authuser.id, notesDto);
  }

  /**
   * delete all the records of logged in user
   * @param id
   * @returns Promise<void>
   */
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
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async deleteNote(@Param('id',ParseIntPipe,MapToUserNotesPipe)notes:NotesModel ):Promise<void>{
    return await this.notesService.destroy(notes);
  }

  /**
   * 
   * @param id 
   * @param body 
   * @returns 
   */
  @Put(':id')
  public async editNote(@Param('id',ParseIntPipe,MapToUserNotesPipe)notes:NotesModel,@Body()body:NotesDto ):Promise<void>{
    return await this.notesService.updateRecord(notes,body);
  }
}
