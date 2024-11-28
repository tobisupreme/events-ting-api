import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { env } from '../../../../config';
import { BaseQueueConsumer } from '../../queue';
import { QUEUE } from './interfaces';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const processorPath = path.join(__dirname, 'processor.ts');

class EmailQueueConsumer extends BaseQueueConsumer {
    constructor() {
        super(QUEUE, processorPath, env);
        console.log('\nEmailQueueConsumer initialized\n');
    }
}
export function initializeEmailWorker(): void {
    new EmailQueueConsumer();
}
