import { ApiProperty } from '@nestjs/swagger';
import { IsEnum,IsString,IsArray } from 'class-validator';
import { cities } from 'src/constants/city.contant';

export class TourDto {
    @ApiProperty()
    @IsEnum(cities, { message: "استان مورد نظر شما موجود نمی باشد" })
    city: string;

    @ApiProperty()
    @IsString({})
    title:string;

    @ApiProperty()
    @IsString({})
    description:string;

    @ApiProperty()
    @IsString({})
    price:string;
    
    @ApiProperty()
    @IsString({})
    url:string;


    @ApiProperty()
    @IsArray({})
    images:string[];
}