import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dbConfig } from './dbConfig';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
      envFilePath: `${process.cwd()}/.env`,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class EnvConfigModule {}
