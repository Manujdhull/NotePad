import { Injectable } from '@nestjs/common';
import { UsersService } from '../../../../users/services/users.service';
import { Command, Option } from 'nestjs-command';
import { AuthService } from '../../../../authentication/services/auth.service';

@Injectable()
export class DestroyUserService {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Command({
    command: 'delete:user',
    describe: 'delete a user',
  })
  async create(
    @Option({
      name: 'token',
      describe: 'the token',
      type: 'string',
      alias: 't',
      required: true,
    })
    token: string,
  ) {
    const user = await this.authService.getUserFromToken(token);
    console.log('user to be delete: ', user);
    const data = this.usersService.findByPK(user.id);
    this.usersService.destroy(await data);
  }
}
