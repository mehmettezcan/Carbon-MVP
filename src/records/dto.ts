import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRecordDto {
  @IsString() companyId!: string;
  @IsString() sourceId!: string;
  @IsNumber() value!: number;         // activity value in Unit
  @IsDateString() occurredAt!: string;
  @IsOptional() @IsString() note?: string;
}
