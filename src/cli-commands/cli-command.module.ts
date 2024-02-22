import { Module } from '@nestjs/common';
import { UserRepoModule } from '../users/user-repo.module';
import { CreateUserService } from './command/user-commands/create-user/create-user.service';
import { AuthModule } from '../authentication/auth.module';
import { UserSigninService } from './command/user-commands/user-signin/user-signin.service';
import { AuthGuard } from '../authentication/guard/auth.guard';
import { DestroyUserService } from './command/user-commands/destroy-user/destroy-user.service';
import { NoteCreateService } from './command/notes-commands/note-create/note-create.service';
import { NotesModule } from '../notes/notes.module';

@Module({
  imports: [AuthModule, UserRepoModule, NotesModule],
  providers: [
    AuthGuard,
    DestroyUserService,
    CreateUserService,
    UserSigninService,
    NoteCreateService,
  ],
})
export class CliCommandModule {}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInVzZXJuYW1lIjoibm5vbGFuIiwiaWF0IjoxNzA4NDIzNDc5fQ.SynXr2c_lJuLKd8SA5woBcHj_zQAAWLSmqbeB8YlTsc
