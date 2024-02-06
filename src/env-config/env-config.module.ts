import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dbConfig } from './dbConfig';
import { mailConfig } from './mail-config';
import storageConfig from './storage-config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [storageConfig, dbConfig, mailConfig],
      envFilePath: `${process.cwd()}/.env`,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class EnvConfigModule {}
