import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants/auth.constants';
import { Request } from 'express';
import { UsersService } from 'src/users/services/users.service';
import { UserModel } from 'src/databases/models/user.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: any = context.switchToHttp().getRequest<Request>();
    const token: string = request.cookies.authorization;
    // if token is not present in response then throw Exception
    if (!token) {
      throw new UnauthorizedException();
    }
    // if present then check
    try {
      const payload: any = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const user: UserModel = await this.userService.findByPK(
        payload.id as number,
      );
      request.user = user;
    } catch {}
    return true;
  }
}
