import { Injectable, Logger } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QUEUE_NAMES } from './queue.constants';
import {
  EmailJob,
  ImageProcessingJob,
  NotificationJob,
  ReportJob,
} from './queue.service';

@Injectable()
@Processor(QUEUE_NAMES.notifications)
export class NotificationsProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationsProcessor.name);

  process(job: Job<NotificationJob>) {
    this.logger.debug(`Processing notification job ${job.id ?? job.name}`);
    return Promise.resolve({ queued: true, userId: job.data.userId });
  }
}

@Injectable()
@Processor(QUEUE_NAMES.emails)
export class EmailsProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailsProcessor.name);

  process(job: Job<EmailJob>) {
    this.logger.debug(`Processing email job ${job.id ?? job.name}`);
    return Promise.resolve({ queued: true, recipient: job.data.to });
  }
}

@Injectable()
@Processor(QUEUE_NAMES.imageProcessing)
export class ImageProcessingProcessor extends WorkerHost {
  private readonly logger = new Logger(ImageProcessingProcessor.name);

  process(job: Job<ImageProcessingJob>) {
    this.logger.debug(`Processing image job ${job.id ?? job.name}`);
    return Promise.resolve({ queued: true, operation: job.data.operation });
  }
}

@Injectable()
@Processor(QUEUE_NAMES.reports)
export class ReportsProcessor extends WorkerHost {
  private readonly logger = new Logger(ReportsProcessor.name);

  process(job: Job<ReportJob>) {
    this.logger.debug(`Processing report job ${job.id ?? job.name}`);
    return Promise.resolve({ queued: true, reportType: job.data.reportType });
  }
}
