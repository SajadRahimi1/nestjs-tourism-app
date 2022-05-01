import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class TokenService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { };

    async getUser(token: string) {
        const user = await this.userModel.findOne({ token: token });
        if (!user) {
            throw new NotFoundException('کاربری یافت نشد');
        }
        return user;
    }
}
