import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  /**
   * Sending mail to sharedUser from who share with title & body of deleted note
   * @param title
   * @param body
   * @param email
   * @param username
   */
  public async sendDeleteNoteMsg(
    title: string,
    body: string,
    email: string,
    username: string,
  ): Promise<void> {
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
