import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseService } from './database.service';
import { modelProviders } from './model-config';

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: DatabaseService,
      imports: [ConfigModule],
      name: 'default',
    }),
    modelProviders,
  ],
  providers: [ConfigService, DatabaseService],
  exports: [modelProviders],
})
export class DatabaseModule {}
