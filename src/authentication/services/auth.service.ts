import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { HashService } from './hash.service';
@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
        private usersService: UsersService,
        private hashService: HashService) { }


    public generatingHash(hash: string): Promise<string> {
        return this.hashService.hashGenerator(hash)
    }

    public async signIn(username: any, pass: any): Promise<{ access_token: string } | string> {
        const user = await this.usersService.findByUsername(username);
        // console.log("user in auth services",user.password);
        if (user) {
            const match = await this.hashService.hashMatch(pass, user?.password);
            // console.log(match);
            if (!match) {
                throw new UnauthorizedException();
            }
            const payload = { id: user.id, username: user.username };
            // console.log("payload humara kya haae",payload)
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        }
        else {
            return 'User doesnot exist';
        }
    }

    public async find(username: string) {
        const data = await this.usersService.findByUsername(username);
        return data;
    }
}