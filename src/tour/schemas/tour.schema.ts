import  {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type TourDocument = Tour & Document;

@Schema()
export class Tour{
    @Prop({required: true, type: String,})
    title:string;

    @Prop({required: true, type: String,})
    description:string;

    @Prop({required: true, type: String,})
    price:string;

    @Prop([{required: true, type: String,}])
    images:string[];

    @Prop({required: true, type: String,})
    city:string;
}

export const TourSchema = SchemaFactory.createForClass(Tour);
