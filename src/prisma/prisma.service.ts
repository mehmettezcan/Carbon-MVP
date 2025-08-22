import { INestApplication, Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() { 
    await (this as any).$connect(); 
  }

  async onModuleDestroy() {
    await (this as any).$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // Listen for process termination signals
    process.on('beforeExit', async () => {
      await app.close();
    });
    
    process.on('SIGINT', async () => {
      await app.close();
    });
    
    process.on('SIGTERM', async () => {
      await app.close();
    });
  }
}
