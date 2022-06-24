import  {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {User} from '../../user/schemas/user.schema';
import {Tour} from './tour.schema';

@Schema()
export class TourReview{
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User',required:true})
    authorId:User;
    
    @Prop({required:true, type:mongoose.Schema.Types.ObjectId,ref:'Tour',})
    tourId:Tour;
    
    @Prop({required:false,type:Date,default:Date.now})
    date:Date;

    @Prop({required:true,type:String})
    comment:string;

    @Prop({required:true,type:Number,min:1,max:5})
    star:number;
}