import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { join } from 'path';
// import * as methodOverride from 'method-override';
import * as bodyParser from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
// import { session } from 'passport';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle("NotePad Application Api's")
    .setDescription('The Notes API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  //for swagger setup
  SwaggerModule.setup('api', app, document);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.setViewEngine('hbs');

  //methodOverride (getter , option)
  // middleware for override the request.method
  // app.use(
  //   methodOverride(function (req): any {
  //     if (req.body && typeof req.body === 'object' && 'update' in req.body) {
  //       const updating: any = req.body.update;
  //       console.log(updating, req.body.update);
  //       delete req.body.update;
  //       return updating;
  //     }
  //   }),
  // );
  app.use(
    session({
      secret: 'asiodasjoddjdoasddasoidjasiodasdjaiodd',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 600000,
      },
    }),
  );
  app.use(passport.initialize());
  await app.listen(8080);
}
bootstrap();
