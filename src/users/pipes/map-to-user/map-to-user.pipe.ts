import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { UsersService } from '../../services/users.service';
import { UserModel } from 'src/databases/models/user.model';

@Injectable()
export class MapToUserPipe implements PipeTransform {
  constructor(private usersService: UsersService) {}

  transform(id: number): Promise<UserModel> {
    const user: Promise<UserModel> = this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
