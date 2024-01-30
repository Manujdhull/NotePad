import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './databases/models/user.model';
import { AuthModule } from './authentication/auth.module';
import { NoteModel } from './databases/models/note.model';
import { SharedNoteModel } from './databases/models/shared-Notes.model';
import { ShareController } from './sharing-notes/controllers/sharing-notes.controller';
import { ShareModule } from './sharing-notes/sharing-notes.module';
// import {ShareService} from './sharing-notes/services/sharing-notes.service'
import { JwtService } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    UsersModule,
    NotesModule,
    AuthModule,
    SequelizeModule.forRoot({
      // username: process.env.username,
      // password: process.env.password,
      // database: process.env.database,
      username: 'mackmanuj',
      password: 'Rubi@123',
      database: 'NotePad',
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      models: [UserModel, NoteModel, SharedNoteModel],
    }),
    ShareModule,
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    MailModule,
  ],
  controllers: [AppController, ShareController],
  providers: [AppService, JwtService],
})
export class AppModule { }
