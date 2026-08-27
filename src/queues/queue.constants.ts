export const QUEUE_NAMES = {
  notifications: 'notifications',
  emails: 'emails',
  imageProcessing: 'image-processing',
  reports: 'reports',
} as const;

export type QueueName = (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES];

export const QUEUE_DEFAULTS = {
  attempts: 3,
  backoff: { type: 'exponential' as const, delay: 1000 },
  removeOnComplete: { age: 86400, count: 1000 },
  removeOnFail: { age: 604800, count: 5000 },
};
