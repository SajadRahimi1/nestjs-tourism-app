import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TourDocument } from './schemas/tour.schema';
import {faker} from '@faker-js/faker';
import { cities } from 'src/constants/city.contant';

@Injectable()
export class TourService {
    constructor(
        @InjectModel('Tour') private readonly tourModel: Model<TourDocument>,
    ) { };

    async randomTour(size:number) {
        return await this.tourModel.aggregate([
            { $sample: { size: size } }
        ]);
    }

    async searchTour(search: string) {
        // return search in title
        return await this.tourModel.find({ title: { $regex: search, $options: 'i' } });
    }

    async filterTourByCity(city: string) {
        // return search in city
        return await this.tourModel.find({ city: { $regex: city, $options: 'i' } });
    }

    async generateFakeData() {
        for (let i = 0; i < 20; i++) {
            const tour = new this.tourModel({
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                price: faker.commerce.price(),
                images: [faker.image.imageUrl()],
                city: faker.random.arrayElement(cities),
            });
            await tour.save();
        }
        return {success: true, message: 'تور ها با موفقیت ساخته شدند'};
    }
}
