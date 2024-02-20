import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    if ('update' in req.body) {
      req.method = req.body.update;
      console.log('Request...', req.method);
    }
    next();
  }
}
