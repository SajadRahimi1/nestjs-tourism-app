import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { InjectModel } from '@nestjs/mongoose';
import { randomBytes, scrypt as _scrypt,randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { UserDocument, User } from './schemas/user.schema';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);


@Injectable()
export class UserService {
    constructor(private readonly mailerService: MailService,
        @InjectModel('User') private readonly userModel: Model<UserDocument>) { };

        async getUserInformation(id: string) {
        const user = await this.userModel.findById(id).select('-password');
        if (!user) {
            throw new NotFoundException('کاربری یافت نشد');
        }
        return user;

        
        
    }

    async singup(email: string, password: string) {

        // generate random code that has 4 digits
        const code = Math.floor(1000 + Math.random() * 9000);

        // generate the salt
        const salt = randomBytes(8).toString('hex');

        // hash password with salt key
        const hash = (await scrypt(password, salt, 25)) as Buffer;

        // concat key and hashed password together
        const hashedPassword = salt + "." + hash.toString('hex');


        // create user
        const user = new this.userModel({ email: email, password: hashedPassword, code: code.toString() });

        await user.save().catch(err => {
            throw new ConflictException('ایمیل قبلا استفاده شده است', '');
        });


        // send code to email 
        await this.mailerService.sendMail(email, code.toString());

        return { success: true, message: 'کد تایید برای شما ارسال شد' };
    }

    async validate(email: string, code: string) {
        const user = await this.userModel.findOne({ email }).select('code');
        if (!user) {
            throw new NotFoundException('کاربری یافت نشد', '');
        }
        console.log(`${code}:${user.code}`);
        if (user.code === code) {
            user.token = randomUUID();
            await user.save();
            user.code=undefined;
            return { success: true, message: 'کاربر با موفقیت تایید شد',user: user};
        }

        throw new UnauthorizedException('کد تایید صحیح نیست', '');
    }

    async login(email: string, password: string) {
        const user = await this.userModel.findOne({ email }).select('+password');
        if (!user) {
            throw new NotFoundException('کاربری یافت نشد');
        }
        if(!user.token){
            throw new NotFoundException('کاربری یافت نشد');
        }

        const [key, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, key, 25)) as Buffer;

        if (storedHash !== hash.toString('hex')) {
            throw new UnauthorizedException("پسورد درست نیست", '');
        }
        user.password = undefined;

        return user;
        // return {_id:user._id,email:user.email};

    }

    async sendRecoveryCode(email: string) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new NotFoundException('کاربری یافت نشد');
        }

        const code = Math.floor(1000 + Math.random() * 9000);

        user.code = code.toString();

        await user.save();

        await this.mailerService.sendMail(email, code.toString());

        return { success: true, message: 'کد تایید برای شما ارسال شد' };
    }

    async recoveryPassword(email: string, code: string, password: string) {
        const user = await this.userModel.findOne({ email }).select('+password').select('+code');
        if (!user) {
            throw new NotFoundException('کاربری یافت نشد');
        }

        if (user.code !== code) {
            throw new UnauthorizedException('کد تایید صحیح نیست', '');
        }

        const salt = randomBytes(8).toString('hex');

        const hash = (await scrypt(password, salt, 25)) as Buffer;

        const hashedPassword = salt + "." + hash.toString('hex');

        user.password = hashedPassword;

        user.code = undefined;

        await user.save();

        return { success: true, message: 'پسورد با موفقیت تغییر یافت' };
    }
}
