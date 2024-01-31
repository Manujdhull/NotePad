import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendDeleteNoteMsg(
    title: string,
    body: string,
    email: string,
    username: string,
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Notes Update',
      template: './confirmation',
      context: {
        title: title,
        body: body,
        username: username,
      },
    });
  }
}
