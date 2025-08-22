# Carbon MVP — NestJS + Prisma

Karbon ayak izi hesaplama ve raporlama için geliştirilmiş bir MVP uygulaması.  
Şirket, kaynak ve aktivite kayıtları üzerinden Scope 1 ve Scope 2 emisyonlarını hesaplar, rapor üretir (JSON, PDF, XLSX).  
CBAM ve Türkiye İklim Kanunu uyumlu olacak şekilde genişletilebilir.

## Özellikler
- Şirket kaydı oluşturma
- Emisyon kaynakları tanımlama (elektrik, yakıt vb.)
- Aktivite verisi girme (kWh, litre, m³)
- Emisyon faktörleri ile otomatik CO₂e hesaplama
- Scope 1 ve Scope 2 ayrımı
- JSON, PDF ve Excel formatında raporlama

## Teknolojiler
- NestJS
- Prisma ORM
- PostgreSQL
- Docker Compose (lokal geliştirme için)
- PDFKit, ExcelJS (raporlama için)

## Kurulum

### Gereksinimler
- Node.js 18+
- Docker ve Docker Compose

### Adımlar
```bash
docker compose up -d

npm install
npm run prisma:dev   # veritabanı tablolarını oluşturur
npm run dev
```

API varsayılan olarak `http://localhost:3000/api` altında çalışır.

## API Uç Noktaları

### Şirketler
- `POST /companies` – Yeni şirket oluştur
- `GET /companies` – Tüm şirketleri listele
- `GET /companies/:id` – Tekil şirket bilgisi

### Kaynaklar
- `POST /sources` – Yeni emisyon kaynağı ekle
- `GET /sources?companyId=...` – Şirketin kaynaklarını listele

### Kayıtlar
- `POST /records` – Aktivite kaydı ekle
- `GET /records?companyId=...&from=...&to=...` – Belirli dönemin kayıtları

### Raporlar
- `GET /reports/generate?companyId=...&periodStart=...&periodEnd=...` – Anlık rapor
- `POST /reports/persist` – Raporu kaydet
- `GET /reports/export/pdf?...` – PDF indir
- `GET /reports/export/xlsx?...` – Excel indir

## Örnek Kullanım

```bash
# Şirket oluşturma
curl -X POST http://localhost:3000/api/companies   -H 'Content-Type: application/json'   -d '{"name":"Acme A.Ş.","sector":"metal"}'

# Elektrik kaynağı ekleme
curl -X POST http://localhost:3000/api/sources   -H 'Content-Type: application/json'   -d '{
    "companyId":"<companyId>",
    "name":"Grid Electricity",
    "type":"ELECTRICITY",
    "unit":"KWH",
    "emissionFactor":0.42
  }'

# Aktivite kaydı ekleme
curl -X POST http://localhost:3000/api/records   -H 'Content-Type: application/json'   -d '{
    "companyId":"<companyId>",
    "sourceId":"<sourceId>",
    "value":10000,
    "occurredAt":"2025-01-31T00:00:00.000Z"
  }'

# Rapor oluşturma
curl "http://localhost:3000/api/reports/generate?companyId=<companyId>&periodStart=2025-01-01&periodEnd=2025-03-31"
```

## Geliştirme Yol Haritası
- Scope 3 (lojistik, tedarik zinciri) ekleme
- Emisyon faktörleri için merkezi katalog
- CSV/Excel veri yükleme desteği
- Firebase kimlik doğrulama ve rol bazlı erişim
- CBAM uyumlu resmi rapor formatları

## Lisans
Bu proje MIT lisansı ile dağıtılmaktadır.

## 📧 Contact

Created by **Mehmet Tezcan** – [LinkedIn](https://www.linkedin.com/in/mehmet-tezcan-aa49159b/)
Feel free to reach out!
