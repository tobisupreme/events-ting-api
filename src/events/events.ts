import { Request, Response, Router } from 'express';
import {
    createResponse,
    ensureRequestBody,
    IsValidUuidSchema,
    ResponseType,
    validateRequestBody,
    validateRequestParam,
} from '../common';
import { prisma } from '../db';
import { EventSchema, RegisterUserForEventSchema } from './events.schema';

const router = Router();

router
    .route('/')
    .post(ensureRequestBody, validateRequestBody(EventSchema), addEvent)
    .get(getEvents);

router
    .route('/register')
    .post(
        ensureRequestBody,
        validateRequestBody(RegisterUserForEventSchema),
        registerUserForEvent
    );

router.route('/:id').get(validateRequestParam(IsValidUuidSchema), getEvent);

async function getEvents(req: Request, res: Response) {
    const events = await prisma.event.findMany();
    const { body, status } = createResponse(ResponseType.Success, events);

    res.status(status).json(body);
}

async function getEvent(req: Request, res: Response) {
    const { id }: IsValidUuidSchema = req.params as IsValidUuidSchema;

    const event = await prisma.event.findUniqueOrThrow({ where: { id } });
    const { body, status } = createResponse(ResponseType.Success, event);

    res.status(status).json(body);
}

async function addEvent(req: Request, res: Response) {
    const normalizedData: EventSchema = req.body;
    const createdEvent = await prisma.event.create({
        data: normalizedData,
    });

    const { body, status } = createResponse(ResponseType.Success, createdEvent);

    res.status(status).json(body);
}

async function registerUserForEvent(req: Request, res: Response) {
    const normalizedData: RegisterUserForEventSchema = req.body;
    const createdEvent = await prisma.eventRegisteration.create({
        data: normalizedData,
    });

    const { body, status } = createResponse(ResponseType.Success, createdEvent);

    res.status(status).json(body);
}

export const eventsRouter = router;
