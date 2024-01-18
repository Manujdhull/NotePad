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
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { NotesDto } from '../dtos/create.notes.Body.Title.dto';
import { NotesModel } from '../../databases/models/notes.model';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) { }
  @Get()
  findAll(): Promise<NotesModel[]> {
    return this.notesService.findAll();
  }

  @Post()
  async create(
    @Body() createNotesDto: NotesDto,
    @Request() req:any,
    @Response() res:any,
  ): Promise<any> {
    const userId:number = Number(req.user.id);
    const user: NotesModel = await this.notesService.create(
      createNotesDto,
      userId,
    );
    return res.status(HttpStatus.CREATED).json(user);
  }
  @Delete()
  public async deleteAllNotes(
    @Response() res: any,
    @Request() req: any,
  ): Promise<any> {
    const userId:number=Number(req.user.id);
    const users: number = await this.notesService.deleteAll(userId);
    return res.status(HttpStatus.OK).json(users);
  }

  @Delete(':id')
  public async deleteNote(
    @Param('id') id: number,
    @Response() res: any,
    @Request() req: any,
  ): Promise<any> {
    const userId:number=Number(req.user.id);
    const users: number = await this.notesService.deleteNote(userId, id);
    return res.status(HttpStatus.OK).json(users);
  }

  @Put(':id')
  public async editNote(
    @Param('id') id: number,
    @Body() createNotesDto: NotesDto,
    @Response() res: any,
    @Request() req: any,
  ): Promise<any> {
    await this.notesService.deleteNote(req.user.id, id);
    const user_id: any = req.user.id;

    const user: NotesModel = await this.notesService.create(
      createNotesDto,
      user_id,
    );
    return res.status(HttpStatus.OK).json(user);
  }
}
