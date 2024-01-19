import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './databases/models/user.model';
import { AuthModule } from './authentication/auth.module';
import { NotesModel } from './databases/models/notes.model';

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
      models: [UserModel,NotesModel],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
