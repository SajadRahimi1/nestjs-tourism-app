import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PlaceModule } from './place/place.module';
import { CommentModule } from './comment/comment.module';
import { TourModule } from './tour/tour.module';

@Module({
  imports: [UserModule, PlaceModule, CommentModule, TourModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
