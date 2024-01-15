import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
      host: 'localhost',
      port: 3000,
      username: 'mackmanuj',
      password: 'Rubi@123',
      database: 'db.users',
      entities: [],
      synchronize: true, // shouldn't be used in production - otherwise you can lose production data.
  }),UsersModule, NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
