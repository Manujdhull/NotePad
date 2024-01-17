import {
  BadRequestException,
  Injectable,
  NotFoundException,
  // UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(username: string, pass: string) {
    // see if user exists
    const user = await this.usersService.find(username);
    // console.log("I am user here",user);
    if (user) {
      throw new BadRequestException('userName already used');
    }
    const saltOrRounds = 10;
    const password = pass;
    const hash = await bcrypt.hash(password, saltOrRounds);
    // Generate the salt
    // const salt=randomBytes(8).toString('hex'); //hexa decimal string generate 16 characters in it
    // const hash=(await scrypt(pass,salt,32) as Buffer);
    // // adding salt and hash result
    // const result=salt + '.' + hash.toString('hex');
    // console.log(result+"result we store in db");

    const userCreated = this.usersService.create(username, hash);
    return userCreated;
  }

  async signin(username: string, password: string): Promise<any> {
    // ---------------method 1
    // const user = await this.usersService.find(username);
    // // console.log("user data is here"+user.password);
    // if(!user){
    //   throw new NotFoundException('user you found not exist');
    // }
    // split pass by .
    // const [salt,storedHash]=user.password.split('.');
    // console.log(salt,"salt");
    // checking hash with stored hash
    // const hash=(await scrypt(password,salt,32)) as Buffer;
    // console.log(hash.toString('hex'),"hash of hex is this");
    // if pass not match the throw error
    // console.log(storedHash,"stored hash is this");

    // if(storedHash!==hash.toString('hex')){
    //   throw new BadRequestException('passowrd you entered is not correct');
    // }

    // -----------method 2
    const user = await this.usersService.find(username);
    if (!user) {
      throw new NotFoundException('user you found not exist');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('passowrd you entered is not correct');
    }
    return user;
  }
}