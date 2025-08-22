import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dtos/create_record.dto';

@Controller('records')
export class RecordsController {
  constructor(private readonly service: RecordsService) {}
  
  @Post()
  create(@Body() dto: CreateRecordDto) { return this.service.create(dto); }

  @Get()
  list(@Query('companyId') companyId: string, @Query('from') from?: string, @Query('to') to?: string) {
    return this.service.list(companyId, from ? new Date(from) : undefined, to ? new Date(to) : undefined);
  }
}
