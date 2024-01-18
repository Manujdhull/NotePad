import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/modules/notes.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './databases/models/user.model';

@Module({
  imports: [
    UsersModule,
    NotesModule,
    SequelizeModule.forRoot({
      username: 'mackmanuj',
      password: 'Rubi@123',
      database: 'NotePad',
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      models: [UserModel],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
