import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlaceDto } from './dto/place.dto';
import { PlaceDocument } from './schemas/place.schema';

@Injectable()
export class PlaceService {
    constructor(@InjectModel('Place') private readonly placeModel: Model<PlaceDocument>) { };

    async getAll() {
        return await this.placeModel.find();
    }

    async insertData(data: PlaceDto) {
        const place = new this.placeModel(data);
        return await place.save()
    }
}
