import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IsOptional, IsString } from 'class-validator';
import { CompaniesService } from './companies.service';

class CreateCompanyDto { @IsString() name!: string; @IsOptional() @IsString() sector?: string }

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Post()
  create(@Body() dto: CreateCompanyDto) { return this.companiesService.create(dto); }

  @Get()
  getCompanies() { return this.companiesService.list(); }

  @Get(':id')
  getCompanyById(@Param('id') id: string) { return this.companiesService.find(id); }
}
