import { Router } from 'express';
import { readFileSync } from 'fs';
import { serve, setup } from 'swagger-ui-express';
import { parse } from 'yaml';
import { env } from '../../config';

const router = Router();

if (env.NODE_ENV === 'development') {
    const file = readFileSync('./src/docs/endpoints.yaml', 'utf8');
    const swaggerJsDocs = parse(file);

    swaggerJsDocs.servers.forEach((server: any) => {
        server.variables.url.default = env.API.HOST;
        server.variables.url.enum = [env.API.HOST];
    });

    router.use('/api-docs', serve, setup(swaggerJsDocs));
}

export default router;
