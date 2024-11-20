import { Router } from 'express';
import { readFileSync } from 'fs';
import { serve, setup } from 'swagger-ui-express';
import { parse } from 'yaml';
const file = readFileSync('./src/docs/endpoints.yaml', 'utf8');

const router = Router();

const swaggerJsDocs = parse(file);

router.use('/api-docs', serve, setup(swaggerJsDocs));

export default router;
