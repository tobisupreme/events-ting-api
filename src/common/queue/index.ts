import { Job, JobsOptions, Worker } from 'bullmq';
import { env } from '../../../config';

export abstract class BaseQueueConsumer {
    protected worker: Worker;

    constructor(queueName: string, processorPath: string, env: env) {
        this.worker = new Worker(queueName, processorPath, {
            connection: {
                host: env.REDIS.HOST,
                port: env.REDIS.PORT,
            },
            prefix: env.API.NAME,
            autorun: true,
        });

        this.setupListeners();
    }

    private setupListeners(): void {
        this.worker.on('active', (job: Job<unknown>) => {
            console.debug(`Processing job with id ${job.id}`);
        });

        this.worker.on('error', (failedReason: Error) => {
            console.error(`Job encountered an error`, failedReason);
        });

        this.worker.on('completed', (job: Job<unknown>) => {
            console.debug(
                `Completed job ${job.id} of type ${
                    job.name
                } with result ${JSON.stringify(job.returnvalue, null, 2)}`
            );
        });

        this.worker.on(
            'failed',
            (job: Job<any, any, string> | undefined, failedReason: Error) => {
                console.error(
                    `Failed processing job ${job?.id} of type ${job?.name} with reason: "${failedReason.message}"`
                );
            }
        );
    }
}

export const DEFAULT_REMOVE_CONFIG: JobsOptions = {
    removeOnComplete: {
        age: 3600,
    },
    removeOnFail: {
        age: 24 * 3600,
    },
};
