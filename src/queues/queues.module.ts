import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { RedisOptions } from 'bullmq';
import { QUEUE_DEFAULTS, QUEUE_NAMES } from './queue.constants';
import { QueueService } from './queue.service';
import {
  EmailsProcessor,
  ImageProcessingProcessor,
  NotificationsProcessor,
  ReportsProcessor,
} from './queue.processors';

function redisConnection(redisUrl: string): RedisOptions {
  const parsed = new URL(redisUrl);
  return {
    host: parsed.hostname,
    port: parsed.port ? Number(parsed.port) : 6379,
    username: parsed.username || undefined,
    password: parsed.password || undefined,
    db: parsed.pathname ? Number(parsed.pathname.slice(1)) || 0 : 0,
    ...(parsed.protocol === 'rediss:' ? { tls: {} } : {}),
    maxRetriesPerRequest: null,
  };
}

@Module({
  imports: [
    ConfigModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: redisConnection(config.getOrThrow<string>('redisUrl')),
        defaultJobOptions: QUEUE_DEFAULTS,
      }),
    }),
    BullModule.registerQueue(
      ...Object.values(QUEUE_NAMES).map((name) => ({ name })),
    ),
  ],
  providers: [
    QueueService,
    NotificationsProcessor,
    EmailsProcessor,
    ImageProcessingProcessor,
    ReportsProcessor,
  ],
  exports: [QueueService],
})
export class QueuesModule {}
