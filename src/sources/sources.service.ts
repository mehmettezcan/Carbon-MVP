import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSourceDto } from './dtos/create_source.dto';

@Injectable()
export class SourcesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateSourceDto) {
    return this.prisma.emissionSource.create({ data: { ...dto, emissionFactor: dto.emissionFactor as any } });
  }

  getSourcesByCompanyId(companyId: string) {
    return this.prisma.emissionSource.findMany({ where: { companyId } });
  }
}
