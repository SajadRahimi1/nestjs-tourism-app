import {IsEnum} from 'class-validator';
import { cities } from 'src/constants/city.contant';

export class SearchDto {
    @IsEnum(cities,{message:"استان مورد نظر شما موجود نمی باشد"})
    city: string;
}