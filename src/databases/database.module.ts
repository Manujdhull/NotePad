import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: DatabaseService,
      imports: [ConfigModule],
      name: 'default',
    }),
  ],
  providers: [ConfigService, DatabaseService],
})
export class DatabaseModule {}
