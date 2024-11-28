import { Job, Queue } from 'bullmq';
import { env } from '../../../../config';
import { DEFAULT_REMOVE_CONFIG } from '../../queue/';
import { JOBS, QUEUE } from './interfaces';

class EmailQueueManager {
    private queue: Queue;

    constructor() {
        this.queue = new Queue(QUEUE, {
            connection: {
                host: env.REDIS.HOST,
                port: env.REDIS.PORT,
            },
            prefix: env.API.NAME,
        });
    }

    async addJobToQueue<T>(jobName: JOBS, data: T): Promise<Job<T>> {
        return this.queue.add(jobName, data, { ...DEFAULT_REMOVE_CONFIG });
    }
}
export const emailQueueManager = new EmailQueueManager();
