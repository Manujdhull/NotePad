import { Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/services/users.service';
import { Command, Positional } from 'nestjs-command';

@Injectable()
export class DestroyUserService {
  constructor(private usersService: UsersService) {}

  @Command({
    command: 'create:user <id>',
    describe: 'creating user',
  })
  async createUser(
    @Positional({
      name: 'id',
      describe: 'name of the user',
      type: 'number',
    })
    id: number,
    // @Positional({
    //   name: 'password',
    //   describe: 'password of th user',
    //   type: 'string',
    // })
    // password: string,
  ) {
    const data = this.usersService.findByPK(id);
    this.usersService.destroy(await data);
  }
}
