import { Controller, Get } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
    constructor(private readonly ticketService: TicketService) { }

    @Get('')
    getData() {
        this.ticketService.getData();
    }
}
