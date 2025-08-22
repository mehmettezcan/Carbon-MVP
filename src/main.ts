import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Carbon MVP')
    .setDescription(
      'API documentation for the Carbon MVP project',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

   const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/v1/api/swagger', app, document);

  // Enable Prisma shutdown hooks
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const PORT = Number(process.env.PORT) || 3000;
  await app.listen(PORT, '0.0.0.0', () => {
    console.log(`API running on http://localhost:${PORT}/v1/api`);
  });
}
bootstrap();
