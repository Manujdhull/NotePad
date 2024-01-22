import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './databases/models/user.model';
import { AuthModule } from './authentication/auth.module';
import { NotesModel } from './databases/models/notes.model';
import { SharedNoteModel } from './databases/models/shared-Notes.model';
import { ShareController } from './sharing-notes/controllers/sharing-notes.controller';
import { ShareModule } from './sharing-notes/sharing-notes.module';
// import {ShareService} from './sharing-notes/services/sharing-notes.service'
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    NotesModule,
    AuthModule,
    SequelizeModule.forRoot({
      username: 'mackmanuj',
      password: 'Rubi@123',
      database: 'NotePad',
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      models: [UserModel, NotesModel, SharedNoteModel],
    }),
    ShareModule,
  ],
  controllers: [AppController, ShareController],
  providers: [AppService, JwtService],
})
export class AppModule {}
