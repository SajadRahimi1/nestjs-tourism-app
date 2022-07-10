import { Controller, Get, Post, Query, Param, Res, UseInterceptors, Headers, Body } from '@nestjs/common';
import { TourService } from './tour.service';
import { Response } from 'express';
import { ApiTags, ApiConsumes, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { TokenHeaderInceptor } from '../guards/token.guard';
import { cities } from 'src/constants/city.contant';
import { SearchDto } from './dto/search.dto';
import { CommentDto } from './dto/comment.dto';
import { TourDto } from './dto/tour.dto';

@ApiTags('tour')
@Controller('tour')
@UseInterceptors(TokenHeaderInceptor)
export class TourController {
    constructor(
        private readonly tourService: TourService,
    ) { };


    @Get('faker')
    async generateFakeData() {
        return await this.tourService.generateFakeData();
    }

    @ApiConsumes("application/x-www-form-urlencoded")
    @ApiQuery({ name: 'size', required: false, type: Number })
    @Get('')
    async randomTour(@Query('size') size = 2) {
        return await this.tourService.randomTour(Number(size));
    }

    @ApiConsumes("application/x-www-form-urlencoded")
    // @ApiBearerAuth("Authorization")
    // @ApiQuery({ name: 'city', required: true, type: String, enum: cities })
    @Get(':city')
    async filterByCity(@Param('city') city: string) {
        console.log(city);
        return await this.tourService.filterTourByCity(city);
    }

    @ApiConsumes("application/x-www-form-urlencoded")
    @ApiBearerAuth("Authorization")
    @Post('comment')
    async comment(@Body() body: CommentDto, @Headers() header) {
        // console.log(header.user.id);
        return await this.tourService.createComment(body.tourId, header.user.id, body.star, body.comment);
    }

    @ApiConsumes("application/x-www-form-urlencoded")
    @ApiBearerAuth("Authorization")
    @Post('')
    async create(@Body() body: TourDto, @Headers() header) {
        // console.log(header.user.id);
        return await this.tourService.createData(body);
    }
}
