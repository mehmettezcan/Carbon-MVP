import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const company = await prisma.company.create({ data: { name: 'Acme A.Ş.', sector: 'metal' } });
  const elec = await prisma.emissionSource.create({
    data: {
      companyId: company.id,
      name: 'Grid Electricity',
      type: 'ELECTRICITY',
      unit: 'KWH',
      emissionFactor: 0.42,
      factorMeta: { country: 'TR', year: 2024 }
    } as any
  });
  console.log('Seeded company:', company.id, 'source:', elec.id);
}

main().finally(() => prisma.$disconnect());
