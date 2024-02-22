import { Injectable } from '@nestjs/common';
import { NotesService } from '../../../../notes/services/notes.service';
import { Command, Positional, Option } from 'nestjs-command';
import { AuthService } from '../../../../authentication/services/auth.service';

@Injectable()
export class NoteCreateService {
  constructor(
    private noteServices: NotesService,
    private authService: AuthService,
  ) {}

  @Command({
    command: 'note:create <title> <body>',
    describe: 'enter title and body of note',
  })
  async login(
    @Positional({
      name: 'title',
      describe: 'title of note',
      type: 'string',
    })
    title: string,
    @Positional({
      name: 'body',
      describe: 'body of note',
      type: 'string',
    })
    body: string,
    @Option({
      name: 'token',
      describe: 'the token',
      type: 'string',
      alias: 't',
      required: true,
    })
    token: string,
  ) {
    const user = this.authService.getUserFromToken(token);
    const data = { Title: title, Body: body };
    this.noteServices.create((await user).id, data);
  }
}
