import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TourSchema } from './schemas/tour.schema';
import { TourController } from './tour.controller';
import { TourService } from './tour.service';

@Module({
  imports:[MongooseModule.forFeature([{name:'Tour',schema:TourSchema},{name:'TourReview',schema:TourSchema}]),HttpModule,UserModule],
  controllers: [TourController],
  providers: [TourService,]
})
export class TourModule {}
