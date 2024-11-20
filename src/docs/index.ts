import { Router } from 'express';
import { readFileSync } from 'fs';
import { serve, setup } from 'swagger-ui-express';
import { parse } from 'yaml';
import { env } from '../../config';

const router = Router();

const file = readFileSync('./src/docs/endpoints.yaml', 'utf8');
const swaggerJsDocs = parse(file);

swaggerJsDocs.servers.forEach((server: any) => {
    server.variables.scheme.default =
        env.SWAGGER.SCHEME || server.variables.scheme.default;
    server.variables.host.default =
        env.SWAGGER.HOST || server.variables.host.default;
});

router.use('/api-docs', serve, setup(swaggerJsDocs));

export default router;
