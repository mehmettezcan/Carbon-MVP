# Carbon MVP — NestJS + Prisma

An MVP application for carbon footprint calculation and reporting.  
Calculates Scope 1 and Scope 2 emissions based on companies, sources, and activity records, and generates reports (JSON, PDF, XLSX).  
Designed to be extendable for CBAM and Turkish Climate Law compliance.

## Features
- Create company records
- Define emission sources (electricity, fuel, etc.)
- Enter activity data (kWh, liters, m³)
- Automatic CO₂e calculation using emission factors
- Separation of Scope 1 and Scope 2
- Reporting in JSON, PDF, and Excel

## Technologies
- NestJS
- Prisma ORM
- PostgreSQL
- Docker Compose (for local development)
- PDFKit, ExcelJS (for reporting)

## Setup

### Requirements
- Node.js 18+
- Docker and Docker Compose

### Steps
```bash
docker compose up -d

npm install
npm run prisma:dev   # create database tables
npm run dev
```

API runs by default at `http://localhost:3000/api`.

## API Endpoints

### Companies
- `POST /companies` – Create new company
- `GET /companies` – List all companies
- `GET /companies/:id` – Get company by id

### Sources
- `POST /sources` – Create new emission source
- `GET /sources?companyId=...` – List company sources

### Records
- `POST /records` – Add activity record
- `GET /records?companyId=...&from=...&to=...` – List records for a period

### Reports
- `GET /reports/generate?companyId=...&periodStart=...&periodEnd=...` – Generate ad-hoc report
- `POST /reports/persist` – Save a report
- `GET /reports/export/pdf?...` – Download PDF
- `GET /reports/export/xlsx?...` – Download Excel

## Example Usage

```bash
# Create company
curl -X POST http://localhost:3000/api/companies   -H 'Content-Type: application/json'   -d '{"name":"Acme Inc.","sector":"metal"}'

# Create electricity source
curl -X POST http://localhost:3000/api/sources   -H 'Content-Type: application/json'   -d '{
    "companyId":"<companyId>",
    "name":"Grid Electricity",
    "type":"ELECTRICITY",
    "unit":"KWH",
    "emissionFactor":0.42
  }'

# Add activity record
curl -X POST http://localhost:3000/api/records   -H 'Content-Type: application/json'   -d '{
    "companyId":"<companyId>",
    "sourceId":"<sourceId>",
    "value":10000,
    "occurredAt":"2025-01-31T00:00:00.000Z"
  }'

# Generate report
curl "http://localhost:3000/api/reports/generate?companyId=<companyId>&periodStart=2025-01-01&periodEnd=2025-03-31"
```

## Roadmap
- Add Scope 3 (logistics, supply chain)
- Central catalog for emission factors
- CSV/Excel data import support
- Firebase authentication and role-based access
- Official CBAM report formats

## License
This project is licensed under the MIT License.

## 📧 Contact

Created by **Mehmet Tezcan** – [LinkedIn](https://www.linkedin.com/in/mehmet-tezcan-aa49159b/)
Feel free to reach out!
