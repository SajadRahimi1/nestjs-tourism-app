import { Controller, Get, Query, Param, Res, UseInterceptors,Headers } from '@nestjs/common';
import { TourService } from './tour.service';
import { Response } from 'express';
import { ApiTags, ApiConsumes, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { TokenHeaderInceptor } from '../guards/token.guard';
import { cities } from 'src/constants/city.contant';
import {SearchDto} from './dto/search.dto';

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
    @Get('random')
    async randomTour(@Query('size') size = 2) {
        return await this.tourService.randomTour(Number(size));
    }

    @ApiConsumes("application/x-www-form-urlencoded")
    @ApiBearerAuth("Authorization")
    @ApiQuery({ name: 'city', required: true, type: String,enum:cities })
    @Get('city')
    async filterByCity(@Query('city') city:SearchDto,@Headers() header) {
        console.log(header.user);
        return await this.tourService.filterTourByCity(city.city);
    }
}
