import cors, { CorsOptions } from 'cors';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import { env } from '../config/index';
import * as packageJson from '../package.json';
import { requestLogger } from './common/middleware';
import { errorHandler } from './common/utils';
import docsRouter from './docs';
import { eventsRouter } from './events';
import { ticketsRouter } from './tickets';
import { usersRouter } from './users';

const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

const corsOptions: CorsOptions = {
    origin: env.ALLOWED_ORIGINS?.split(',') || '*',
    credentials: true,
};
app.use(cors(corsOptions));

app.use(requestLogger);

app.use('/', docsRouter);
app.use('/events', eventsRouter);
app.use('/users', usersRouter);
app.use('/tickets', ticketsRouter);

app.use('/', (_: Request, res: Response) => {
    res.status(200).json({
        name: packageJson.name,
        description: packageJson.description,
        author: packageJson.author,
        version: packageJson.version,
        license: packageJson.license,
    });
});

app.use(errorHandler);

app.listen(env.API.PORT, () => {
    console.log(`%=%=%=%=%=%=%=%=%=%=%=%=%=%=%=%=%=%=%=%=%=%=%=%=%`);
    console.log(`Server is running on port ${env.API.PORT}`);
    console.log(`API documentation: ${env.API.HOST}/api-docs`);
    console.log(`%=%=%=%=%=%=%=%=%=%=%=%=%=%=%=%=%=%=%=%=%=%=%=%=%`);
});
