import { Injectable } from '@nestjs/common';
import { AuthService } from '../../../../authentication/services/auth.service';
import { Command, Positional } from 'nestjs-command';

@Injectable()
export class UserSigninService {
  constructor(private authService: AuthService) {}

  @Command({
    command: 'login:user <username> <password>',
    describe: 'login user with username & password',
  })
  async login(
    @Positional({
      name: 'username',
      describe: 'username of who want to login',
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
    const user = await this.authService.signIn(username, password);
    console.log('hey budy your token ', user);
  }
}
