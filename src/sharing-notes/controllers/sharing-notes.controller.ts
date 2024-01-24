import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../authentication/guard/auth.guard';
import { ShareService } from '../services/sharing-notes.service';
import { SharedNoteModel } from '../../databases/models/shared-Notes.model';
import { ShareDto } from '../dtos/sharing-notes.dto';
import { AuthUser } from '../../users/authUser.decorator';
import { UserModel } from '../../databases/models/user.model';

@Controller('share')
@UseGuards(AuthGuard)
export class ShareController {
  constructor(private shareService: ShareService) {}

  @Get('all')
  findAll() {
    return this.shareService.findAllSharedNotes();
  }

  @Post('touser')
  @UsePipes(new ValidationPipe({ transform: true }))
  async sharingNotes(
    @Body() shareDto: ShareDto,
    @AuthUser() authUser: UserModel,
  ): Promise<SharedNoteModel | string> {
    return this.shareService.sharingNote(shareDto, authUser.id);
  }

  @Get()
  public async ShowSharedNotes(@AuthUser() authUser: UserModel) {
    return this.shareService.ShowSharedNotes(authUser.id);
  }
}
