import { Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  ValidationPipe,
  UsePipes,
  Param,
  Headers } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import {UsersService} from '../../users/services/users.service';
import {NoteDtoSignUp} from '../dtos/notes.dto';


@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService,
    private usersService: UsersService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  create(@Body() body:NoteDtoSignUp){
    return 
  }
}
