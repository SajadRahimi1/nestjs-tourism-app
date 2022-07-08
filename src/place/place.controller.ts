import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {  ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PlaceDto } from './dto/place.dto';
import { PlaceService } from './place.service';

@ApiTags('place')
@Controller('place')
export class PlaceController {
    constructor(private readonly placeService: PlaceService) { };

    @ApiConsumes("application/x-www-form-urlencoded")
    @Get('')
    async getAll() {
        return await this.placeService.getAll();
    }

    @ApiConsumes("application/x-www-form-urlencoded")
    // @ApiBearerAuth("Authorization")
    // @ApiQuery({ name: 'city', required: true, type: String, enum: cities })
    @Get(':city')
    async filterByCity(@Param('city') city: string) {
        console.log(city);
        return await this.placeService.filterTourByCity(city);
    }

    @ApiConsumes("application/x-www-form-urlencoded")
    @Post('insert')
    async insert(@Body() body: PlaceDto) {
        return await this.placeService.insertData(body);
    }
}
