import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/databases/models/user.model';

// @Injectable()
export class HashService {
  constructor(private usersService: UsersService) {}

  public async hashGenerator(pass: string) {
    const saltOrRounds = 10;
    const password = pass;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return hash;
  }

  public async hashMatch(username, password): Promise<UserModel> {
    const user = await this.usersService.find(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('passowrd you entered is not correct');
    }
    return user;
  }
}
