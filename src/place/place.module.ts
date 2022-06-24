import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import {MongooseModule} from '@nestjs/mongoose';
import { PlaceSchema } from './schemas/place.schema';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[MongooseModule.forFeature([{name:"Place",schema:PlaceSchema}]),HttpModule,UserModule],
  controllers: [PlaceController],
  providers: [PlaceService]
})
export class PlaceModule {}
