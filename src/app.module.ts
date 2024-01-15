import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import {UsersController} from './users/users.controller'
import {UsersService} from './users/users.service'


@Module({
 imports: [UsersModule, NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// imports: [TypeOrmModule.forRoot({
//   type: 'mysql',
//     host: 'localhost',
//     port: 3000,
//     username: 'mackmanuj',
//     password: 'Rubi@123',
//     database: 'db.users',
//     entities: [],
//     synchronize: true, // shouldn't be used in production - otherwise you can lose production data.
// }),