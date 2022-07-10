import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TourDocument } from './schemas/tour.schema';
import { faker } from '@faker-js/faker';
import { cities } from 'src/constants/city.contant';
import { TourReview } from './schemas/tour-review.schema';

@Injectable()
export class TourService {
    constructor(
        @InjectModel('Tour') private readonly tourModel: Model<TourDocument>,
        @InjectModel('TourReview') private readonly tourReviewModel: Model<TourReview>,
    ) { };

    async randomTour(size: number) {
        return await this.tourModel.find();
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
                url: faker.internet.url()
            });
            await tour.save();
        }
        return { success: true, message: 'تور ها با موفقیت ساخته شدند' };
    }

    async createComment(tourId: string, userId: string, star: number, commentText: string) {
        const tour = await this.tourModel.findById(tourId);
        console.log(tour);
        if (!tour) {
            return { success: false, message: 'تور مورد نظر یافت نشد' };
        }
        const comment = new this.tourReviewModel({
            authorId: userId,
            tourId: tour,
            star: star,
            comment: commentText,
        });
        await comment.save();
        return { success: true, message: 'نظر شما با موفقیت ثبت شد' };
    }
}
