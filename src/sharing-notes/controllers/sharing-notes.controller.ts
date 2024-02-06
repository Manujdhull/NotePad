import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  UsePipes,
  ValidationPipe,
  Query,
  Redirect,
} from '@nestjs/common';
import { AuthGuard } from '../../authentication/guard/auth.guard';
import { ShareService } from '../services/sharing-notes.service';
import { SharedNoteModel } from '../../databases/models/shared-Notes.model';
import { AuthUser } from '../../users/authUser.decorator';
import { UserModel } from '../../databases/models/user.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Shared Notes')
@Controller('share')
@UseGuards(AuthGuard)
export class ShareController {
  constructor(private shareService: ShareService) {}
  /**
   * create notes of logged in user
   * @param data
   * @param authUser
   * @param _query
   * @return Promise<void>
   */
  @Post('notes')
  @UsePipes(ValidationPipe)
  @Redirect('/notes')
  async sharingNotes(
    @Body() data:any,
    @AuthUser() authUser: UserModel,
    @Query() _query:any,
  ): Promise<void> {
    await this.shareService.sharingNote(data);
  }

  /**
   * showing notes of logged in user
   * @param authUser
   * @returns  Promise<SharedNoteModel[]>
   */
  @Get()
  public async ShowSharedToMeNotes(
    @AuthUser() authUser: UserModel,
  ): Promise<SharedNoteModel[]> {
    return this.shareService.ShowSharedNotes(authUser.id);
  }
}
