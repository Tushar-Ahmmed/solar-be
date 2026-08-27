import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { QUEUE_DEFAULTS, QUEUE_NAMES } from './queue.constants';

export interface NotificationJob {
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, unknown>;
}

export interface EmailJob {
  to: string;
  subject: string;
  template: string;
  data?: Record<string, unknown>;
}

export interface ImageProcessingJob {
  sourceUrl: string;
  operation: string;
  data?: Record<string, unknown>;
}

export interface ReportJob {
  reportType: string;
  requestedById: string;
  filters?: Record<string, unknown>;
}

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(QUEUE_NAMES.notifications)
    private readonly notificationsQueue: Queue<NotificationJob>,
    @InjectQueue(QUEUE_NAMES.emails)
    private readonly emailsQueue: Queue<EmailJob>,
    @InjectQueue(QUEUE_NAMES.imageProcessing)
    private readonly imageProcessingQueue: Queue<ImageProcessingJob>,
    @InjectQueue(QUEUE_NAMES.reports)
    private readonly reportsQueue: Queue<ReportJob>,
  ) {}

  enqueueNotification(data: NotificationJob, options?: { jobId?: string }) {
    return this.notificationsQueue.add('notification', data, {
      ...QUEUE_DEFAULTS,
      ...options,
    });
  }

  enqueueEmail(data: EmailJob, options?: { jobId?: string }) {
    return this.emailsQueue.add('email', data, {
      ...QUEUE_DEFAULTS,
      ...options,
    });
  }

  enqueueImageProcessing(
    data: ImageProcessingJob,
    options?: { jobId?: string },
  ) {
    return this.imageProcessingQueue.add('image-processing', data, {
      ...QUEUE_DEFAULTS,
      ...options,
    });
  }

  enqueueReport(data: ReportJob, options?: { jobId?: string }) {
    return this.reportsQueue.add('report', data, {
      ...QUEUE_DEFAULTS,
      ...options,
    });
  }
}

export type QueueJob = Job<
  NotificationJob | EmailJob | ImageProcessingJob | ReportJob
>;
