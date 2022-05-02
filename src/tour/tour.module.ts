import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TourSchema } from './schemas/tour.schema';
import { TourController } from './tour.controller';
import { TourService } from './tour.service';

@Module({
  imports:[MongooseModule.forFeature([{name:'Tour',schema:TourSchema},{name:'TourReview',schema:TourSchema}])],
  controllers: [TourController],
  providers: [TourService]
})
export class TourModule {}
