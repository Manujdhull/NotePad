import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { UsersService } from '../../services/users.service';

@Injectable()
export class MapToUserPipe implements PipeTransform {
  constructor(private usersService: UsersService) {}

  transform(id: number, metadata: ArgumentMetadata) {
    const user = this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
