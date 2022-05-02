import { Controller, Get, Query, Param, Res } from '@nestjs/common';
import { TourService } from './tour.service';
import { Response } from 'express';
import { ApiTags, ApiConsumes, ApiQuery } from '@nestjs/swagger';

@ApiTags('tour')
@Controller('tour')
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
}
