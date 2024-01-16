import { Controller, UsePipes, ValidationPipe, Get } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UsePipes(new ValidationPipe())
  @Get('List')
  async findAll() {}
}
