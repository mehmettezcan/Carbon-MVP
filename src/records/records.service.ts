import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecordDto } from './dto';

@Injectable()
export class RecordsService {
  constructor(private prisma: PrismaService) {}
  create(dto: CreateRecordDto) {
    return this.prisma.emissionRecord.create({ data: { ...dto, occurredAt: new Date(dto.occurredAt) as any } });
  }
  list(companyId: string, from?: Date, to?: Date) {
    return this.prisma.emissionRecord.findMany({
      where: { companyId, ...(from || to ? { occurredAt: { gte: from ?? undefined, lte: to ?? undefined } } : {}) },
      include: { source: true },
      orderBy: { occurredAt: 'asc' },
    });
  }
}
