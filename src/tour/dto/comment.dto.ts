import {IsString,IsNumber,Min,Max} from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";

export class CommentDto{
    
    @ApiProperty()
    @IsString()
    tourId:string;

    @ApiProperty()
    @IsString()
    comment:string;

    @ApiProperty()
    @IsNumber()
    @Min(1)
    @Max(5)
    star:number;
}