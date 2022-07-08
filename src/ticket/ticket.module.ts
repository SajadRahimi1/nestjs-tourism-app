import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import {HttpModule} from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [TicketService],
  controllers: [TicketController]
})
export class TicketModule {}
