import { IsDateString, IsOptional, IsString } from 'class-validator';
export class GenerateReportDto {
  @IsString() companyId!: string;
  @IsDateString() periodStart!: string;
  @IsDateString() periodEnd!: string;
  @IsOptional() @IsString() productUnits?: string;
}
