import { NestFactory } from '@nestjs/core';
import { CommandService } from 'nestjs-command';
import { AppModule } from './app.module';
import * as process from 'process';

(async () => {
  const app = await NestFactory.create(AppModule, { logger: false });
  await app.init();
  console.log('Hello');
  await app.get(CommandService).exec();
  console.log('byee');
  await app.close();
  process.exit(0);
})();
