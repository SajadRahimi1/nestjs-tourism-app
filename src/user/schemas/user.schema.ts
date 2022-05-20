import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, unique: true, type: String, })
    email: string;

    @Prop({ required: true, type: String, select: false })
    password: string;

    @Prop({select: false})
    code: string;

    @Prop({required: false})
    token:string;
}

export const UserSchema = SchemaFactory.createForClass(User);