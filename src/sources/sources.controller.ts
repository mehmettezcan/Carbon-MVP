import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateSourceDto } from './dtos/create_source.dto';
import { SourcesService } from './sources.service';

@Controller('sources')
export class SourcesController {
  constructor(private readonly service: SourcesService) {}
  @Post()
  create(@Body() dto: CreateSourceDto) { return this.service.create(dto); }
  @Get()
  list(@Query('companyId') companyId: string) { return this.service.list(companyId); }
}
