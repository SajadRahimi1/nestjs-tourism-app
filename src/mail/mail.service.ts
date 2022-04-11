import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendMail(email: string, code: string) {
        var s = `سلام به اپلیکیشن گردشگری خوش آمدید\nکد ورود شما\n${code}`;

        await this.mailerService.sendMail({
            to: email,
            subject: 'کد ورود از اپلیکیشن گردشگری',
            text: s
        });
    }
}
