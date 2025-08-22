import { IsEnum, IsOptional, IsString, IsNumber } from 'class-validator';
import { SourceType, Unit } from '@prisma/client';

export class CreateSourceDto {
  @IsString() companyId!: string;
  @IsString() name!: string;
  @IsEnum(SourceType) type!: SourceType;
  @IsEnum(Unit) unit!: Unit;
  @IsNumber() emissionFactor!: number; // kg CO2e / unit
  @IsOptional() factorMeta?: object;   // JSON
}