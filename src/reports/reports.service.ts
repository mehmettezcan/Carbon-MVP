import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { computeEmissionKg, inferScope } from '../common/utils';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async generate(companyId: string, periodStart: Date, periodEnd: Date) {
    const records = await this.prisma.emissionRecord.findMany({
      where: { companyId, occurredAt: { gte: periodStart, lte: periodEnd } },
      include: { source: true },
    });

    let scope1Kg = 0, scope2Kg = 0;
    const bySource: Record<string, { name: string; kg: number }> = {};

    for (const r of records) {
      const kg = computeEmissionKg(Number(r.value), Number(r.source.emissionFactor));
      const scope = inferScope(r.source.type);
      if (scope === 'SCOPE1') scope1Kg += kg; else scope2Kg += kg;
      bySource[r.sourceId] = { name: r.source.name, kg: (bySource[r.sourceId]?.kg || 0) + kg };
    }

    const totalKg = scope1Kg + scope2Kg;
    return { totalKg, scope1Kg, scope2Kg, bySource, count: records.length };
  }

  async persist(companyId: string, periodStart: Date, periodEnd: Date) {
    const result = await this.generate(companyId, periodStart, periodEnd);
    return this.prisma.report.create({
      data: {
        companyId,
        periodStart,
        periodEnd,
        totalKg: result.totalKg as any,
        scope1Kg: result.scope1Kg as any,
        scope2Kg: result.scope2Kg as any,
        details: result.bySource as any,
      },
    });
  }
}
