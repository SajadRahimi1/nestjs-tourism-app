import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PlaceModule } from './place/place.module';
import { CommentModule } from './comment/comment.module';
import { TourModule } from './tour/tour.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath:resolve('./images/'),
      serveRoot:'/images',
      exclude: ['/api*'],
    }),
    UserModule, PlaceModule, CommentModule, TourModule, MongooseModule.forRoot("mongodb://localhost:27017/tourism-app"), MailModule,
    ConfigModule.forRoot({ isGlobal: true }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
