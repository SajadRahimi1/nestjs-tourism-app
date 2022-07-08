import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class TicketService {

    constructor(private readonly http: HttpService) { }

     getData() {
        this.http.get("https://mrbilit.com/flights/THR-SYZ/?departureDate=1401-04-31&adultCount=1&childCount=0&infantCount=0")
            .pipe(map(response => {
                
            }));
    }
}
