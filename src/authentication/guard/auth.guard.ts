import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants/auth.constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: any = context.switchToHttp().getRequest();
    const token: string = request.cookies.authorization;
    console.log('token', token);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: any = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      console.log(payload);
      request['user'] = payload;
    } catch {
      // throw new UnauthorizedException();
    }
    return true;
  }

  // private extractTokenFromHeader(request: Request): string | undefined {
  //   const [type, token] = request.headers.authorization?.split(' ') ?? [];
  //   return type === 'Bearer' ? token : undefined;
  // }
}
