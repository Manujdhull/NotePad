import { Injectable } from '@nestjs/common';
import { UsersService } from '../../../../users/services/users.service';
import { Command, Positional } from 'nestjs-command';

@Injectable()
export class CreateUserService {
  constructor(public usersService: UsersService) {}

  @Command({
    command: 'create:user <username> <password>',
    describe: 'creating user with username & password',
  })
  async create(
    @Positional({
      name: 'username',
      describe: 'username of user',
      type: 'string',
    })
    username: string,
    @Positional({
      name: 'password',
      describe: 'password of user',
      type: 'string',
    })
    password: string,
  ) {
    const data = { username: username, password: password };
    await this.usersService.createUser(data);
  }
}
