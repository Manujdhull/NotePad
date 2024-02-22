import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { HashService } from './hash.service';
import { jwtConstants } from '../constants/auth.constants';
import { UserModel } from 'src/databases/models/user.model';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
    private hashService: HashService,
  ) {}

  /**
   * function calling function of generating hash
   * @param hash
   * @returns Promise<string>
   */
  public generatingHash(hash: string): Promise<string> {
    return this.hashService.hashGenerator(hash);
  }

  /**
   * function for signin
   * @param username
   * @param pass
   * @returns Promise<{ access_token: string } | string>
   */
  public async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string } | string> {
    const user: UserModel = await this.usersService.findByUsername(username);
    console.log('user', user);
    if (user) {
      const match = await this.hashService.hashMatch(pass, user?.password);
      //if token not match throw exception
      if (!match) {
        throw new UnauthorizedException();
      }
      //if match setting payload
      const payload = { id: user.id, username: user.username };
      console.log('payload humara kya haae', payload);
      const accesToken = {
        access_token: await this.jwtService.signAsync(payload, {
          //hashing password with this algorithm
          algorithm: 'HS256',
          //giving jwtconstants.secret here bcz in module it not works
          secret: jwtConstants.secret,
        }),
      };
      return accesToken.access_token;
    } else {
      return 'User doesnot exist';
    }
  }

  public async getUserFromToken(token) {
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const user: UserModel = await this.usersService.findOne(payload.id);
      return user;
    } catch {
      throw new UnauthorizedException();
    }
  }

  /**
   * function find user with userName
   * @param username
   * @returns Promise<UserModel>
   */
  // public async find(username: string):Promise<UserModel> {
  //   const data:UserModel = await this.usersService.findByUsername(username);
  //   return data;
  // }
}
