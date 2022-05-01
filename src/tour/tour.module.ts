import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { TourController } from './tour.controller';
import { TourService } from './tour.service';

@Module({
  imports:[],
  controllers: [TourController],
  providers: [TourService]
})
export class TourModule {}
