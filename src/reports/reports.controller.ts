import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { GenerateReportDto } from './dtos/generate_report.dto';
import { Response } from 'express';
import PDFDocument = require('pdfkit');
import ExcelJS = require('exceljs');

@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Get('generate')
  async generate(@Query('companyId') companyId: string, @Query('periodStart') ps: string, @Query('periodEnd') pe: string) {
    return this.service.generate(companyId, new Date(ps), new Date(pe));
  }

  @Post('persist')
  async persist(@Body() dto: GenerateReportDto) {
    return this.service.persist(dto.companyId, new Date(dto.periodStart), new Date(dto.periodEnd));
  }

  @Get('export/pdf')
  async exportPdf(@Query('companyId') companyId: string,
                  @Query('periodStart') ps: string,
                  @Query('periodEnd') pe: string,
                  @Res() res: Response) {
    const data = await this.service.generate(companyId, new Date(ps), new Date(pe));
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="carbon-report.pdf"');
    doc.pipe(res as any);
    doc.fontSize(18).text('Carbon Report', { underline: true });
    doc.moveDown().fontSize(12).text(`Company: ${companyId}`);
    doc.text(`Period: ${ps} → ${pe}`);
    doc.moveDown().text(`Total (kg CO2e): ${data.totalKg.toFixed(2)}`);
    doc.text(`Scope 1 (kg): ${data.scope1Kg.toFixed(2)}`);
    doc.text(`Scope 2 (kg): ${data.scope2Kg.toFixed(2)}`);
    doc.moveDown().text('By Source:');
    Object.values<any>(data.bySource).forEach((row: any) => doc.text(` - ${row.name}: ${row.kg.toFixed(2)} kg`));
    doc.end();
  }

  @Get('export/xlsx')
  async exportXlsx(@Query('companyId') companyId: string,
                   @Query('periodStart') ps: string,
                   @Query('periodEnd') pe: string,
                   @Res() res: Response) {
    const data = await this.service.generate(companyId, new Date(ps), new Date(pe));
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Carbon');
    ws.addRow(['Metric', 'Value']);
    ws.addRow(['Total (kg CO2e)', data.totalKg]);
    ws.addRow(['Scope 1 (kg)', data.scope1Kg]);
    ws.addRow(['Scope 2 (kg)', data.scope2Kg]);
    ws.addRow([]);
    ws.addRow(['Source', 'kg CO2e']);
    for (const row of Object.values<any>(data.bySource)) ws.addRow([row.name, row.kg]);
    res.setHeader('Content-Disposition', 'attachment; filename="carbon-report.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    await wb.xlsx.write(res as any);
    (res as any).end();
  }
}
