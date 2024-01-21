// import { Controller } from '@nestjs/common';

// @Controller('sharing-notes')
// export class SharingNotesController {}

import { Controller, Get, Post, UseGuards, Body, UsePipes, ValidationPipe, HttpStatus, HttpCode } from '@nestjs/common';
// import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../authentication/guard/auth.guard';
import { ShareService } from '../services/sharing-notes.service';
import {  } from '../../databases/models/shared-Notes.model';
import { ShareDto } from '../dtos/sharing-notes.dto';
import { AuthUser } from '../../users/authUser.decorator';
import { UserModel } from '../../databases/models/user.model';

@Controller('share')
@UseGuards(AuthGuard)
export class ShareController {
    constructor(private shareService: ShareService) { }

    @Get('all')
    findAll() {
        return this.shareService.findAllSharedNotes();
    }

    @Post()
    @UsePipes(ValidationPipe)
    @HttpCode(HttpStatus.CREATED)
    // @ApiBody({ type: ShareDto })
    async sharingNotes(@Body() shareDto: ShareDto, @AuthUser() authUser: UserModel): Promise<ShareDto | string> {
        return this.shareService.sharingNote(shareDto, authUser.id);
    }

    @Get()
    public async ShowSharedToMeNotes(@AuthUser() authUser: UserModel) {
        return this.shareService.ShowSharedToMeNotes(authUser.id);
    }



}

