import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type PlaceDocument = Place&Document;

@Schema()
export class Place{
    @Prop({ required: true, type: String})
    title:string;
    
    @Prop({required: true, type: String})
    city: string;
    
    @Prop({required: true, type: String})
    lat: string;
    
    @Prop({required: true, type: String})
    long: string;
    
    @Prop({required: true, type: String})
    type: string;

    @Prop({required: false, type: String})
    description:string;
    
    @Prop({required: false, type: String})
    image:string;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);