import { IsString, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { cities } from "src/constants/city.contant";
import { placeType } from "src/constants/place-type.contant";

export class PlaceDto {

    @ApiProperty({})
    @IsString()
    title: string;

    @ApiProperty({enum:cities})
    @IsEnum(cities, { message: "شهر مورد نظر شما موجود نمی باشد" })
    city: string;

    @ApiProperty({})
    @IsString()
    lat: string;

    @ApiProperty({})
    @IsString()
    long: string;

    @ApiProperty({enum:placeType})
    @IsEnum(placeType)
    type: string;

    @ApiProperty({})
    @IsString()
    description: string;

    @ApiProperty({})
    @IsString()
    image: string;
}