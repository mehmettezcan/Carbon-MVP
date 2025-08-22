import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CompaniesModule } from './companies/companies.module';
import { SourcesModule } from './sources/sources.module';
import { RecordsModule } from './records/records.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, CompaniesModule, SourcesModule, RecordsModule, ReportsModule],
})
export class AppModule { }
