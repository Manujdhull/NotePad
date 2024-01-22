import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
