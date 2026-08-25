import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async checkHealth() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        success: true,
        message: 'Solar API is healthy',
        data: {
          status: 'ok',
          database: 'connected',
        },
      };
    } catch {
      throw new ServiceUnavailableException({
        success: false,
        message: 'Database connection unavailable',
        data: {
          status: 'degraded',
          database: 'disconnected',
        },
      });
    }
  }
}
