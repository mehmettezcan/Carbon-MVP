-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('ELECTRICITY', 'STATIONARY_FUEL', 'MOBILE_FUEL', 'FUGITIVE', 'PROCESS');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('KWH', 'M3', 'LITRE', 'TON', 'KG', 'KM');

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sector" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmissionSource" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SourceType" NOT NULL,
    "unit" "Unit" NOT NULL,
    "emissionFactor" DECIMAL(12,6) NOT NULL,
    "factorMeta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmissionSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmissionRecord" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "value" DECIMAL(18,6) NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmissionRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "totalKg" DECIMAL(18,6) NOT NULL,
    "scope1Kg" DECIMAL(18,6) NOT NULL,
    "scope2Kg" DECIMAL(18,6) NOT NULL,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EmissionRecord_companyId_occurredAt_idx" ON "EmissionRecord"("companyId", "occurredAt");

-- CreateIndex
CREATE INDEX "EmissionRecord_sourceId_occurredAt_idx" ON "EmissionRecord"("sourceId", "occurredAt");

-- CreateIndex
CREATE INDEX "Report_companyId_periodStart_periodEnd_idx" ON "Report"("companyId", "periodStart", "periodEnd");

-- AddForeignKey
ALTER TABLE "EmissionSource" ADD CONSTRAINT "EmissionSource_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmissionRecord" ADD CONSTRAINT "EmissionRecord_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmissionRecord" ADD CONSTRAINT "EmissionRecord_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "EmissionSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
