import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  create(data: { name: string; sector?: string }) {
    return this.prisma.company.create({ data });
  }

  getCompanies() { return this.prisma.company.findMany(); }

  getCompanyById(id: string) { return this.prisma.company.findUnique({ where: { id } }); }

}
