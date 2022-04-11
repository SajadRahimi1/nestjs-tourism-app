import { Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from './schemas/user.schema';


@Injectable()
export class UserService {
    constructor(private readonly mailerService: MailService,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>) { };


    async singup(email: string, password: string) {
        // generate random code that has 4 digits
        const code = Math.floor(1000 + Math.random() * 9000);

        // create user
        const user = new this.userModel({ email, password, code });
        await user.save();

        console.log(`code: ${code}`);

        // send code to email 
        await this.mailerService.sendMail(email, code.toString());

        console.log(`email: ${email}`);

        return { success: true, message: 'کد تایید برای شما ارسال شد' };
    }


}
