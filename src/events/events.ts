import { TicketStatus } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response, Router } from 'express';
import {
    ApiError,
    createResponse,
    ensureRequestBody,
    fail,
    generateQRCode,
    IsValidUuidSchema,
    ResponseType,
    validateRequestBody,
    validateRequestParam,
} from '../common';
import { prisma } from '../db';
import {
    CheckInUserForEventSchema,
    EventSchema,
    RegisterUserForEventSchema,
} from './events.schema';

const router = Router();

router
    .route('/')
    .post(ensureRequestBody, validateRequestBody(EventSchema), addEvent)
    .get(getEvents);

router
    .route('/register-user')
    .post(
        ensureRequestBody,
        validateRequestBody(RegisterUserForEventSchema),
        registerUserForEvent
    );

router
    .route('/:id/registrations')
    .get(validateRequestParam(IsValidUuidSchema), getEventRegistrations)
    .delete(validateRequestParam(IsValidUuidSchema), deleteEVentRegistration);

router
    .route('/registrations/:id')
    .get(validateRequestParam(IsValidUuidSchema), getEventRegistration)
    .post(
        validateRequestParam(IsValidUuidSchema),
        validateRequestBody(CheckInUserForEventSchema),
        checkInEventRegistration
    );

router.route('/:id').get(validateRequestParam(IsValidUuidSchema), getEvent);

async function getEvents(req: Request, res: Response) {
    const events = await prisma.event.findMany({
        select: {
            id: true,
            name: true,
            startDate: true,
            endDate: true,
            status: true,
            metadata: true,
            createdAt: true,
            updatedAt: true,
        },
    });
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
    try {
        const eventRegistration = await prisma.$transaction(
            async (txnPrisma) => {
                const eventRegistration =
                    await prisma.eventRegisteration.create({
                        data: normalizedData,
                    });
                const barcodeData = await generateQRCode(eventRegistration.id);
                if (!barcodeData) {
                    console.warn(
                        'Failed to generate barcode for event registration: ',
                        eventRegistration.id
                    );
                }
                await txnPrisma.ticket.create({
                    data: {
                        eventRegistrationId: eventRegistration.id,
                        barcodeData,
                    },
                });

                return txnPrisma.eventRegisteration.findFirst({
                    where: { id: eventRegistration.id },
                    select: {
                        id: true,
                        createdAt: true,
                        status: true,
                        user: { select: { id: true, email: true, name: true } },
                        event: { select: { id: true, name: true } },
                        ticket: {
                            select: {
                                id: true,
                                barcodeData: true,
                                status: true,
                            },
                        },
                    },
                });
            }
        );

        const { body, status } = createResponse(
            ResponseType.Success,
            eventRegistration
        );

        res.status(status).json(body);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return fail(
                    res,
                    ApiError.TicketDulicate,
                    'User already registered for this event'
                );
            }

            if (error.code === 'P2003') {
                return fail(
                    res,
                    ApiError.InvalidOperation,
                    'User or Event does not exist'
                );
            }
        }
        throw error;
    }
}

async function getEventRegistrations(req: Request, res: Response) {
    const { id }: IsValidUuidSchema = req.params as IsValidUuidSchema;

    const eventRegistrations = await prisma.eventRegisteration.findMany({
        where: { eventId: id },
        select: {
            id: true,
            createdAt: true,
            status: true,
            user: { select: { id: true, email: true, name: true } },
            event: { select: { id: true, name: true } },
            ticket: {
                select: {
                    id: true,
                    barcodeData: true,
                    status: true,
                },
            },
        },
    });

    const { body, status } = createResponse(
        ResponseType.Success,
        eventRegistrations
    );

    res.status(status).json(body);
}

async function getEventRegistration(req: Request, res: Response) {
    const { id } = req.params as IsValidUuidSchema;

    const eventRegistration = await prisma.eventRegisteration.findFirst({
        where: { id },
        select: {
            id: true,
            createdAt: true,
            status: true,
            user: { select: { id: true, email: true, name: true } },
            event: { select: { id: true, name: true } },
            ticket: {
                select: {
                    id: true,
                    barcodeData: true,
                    status: true,
                },
            },
        },
    });

    const { body, status } = createResponse(
        ResponseType.Success,
        eventRegistration
    );

    res.status(status).json(body);
}

async function checkInEventRegistration(req: Request, res: Response) {
    const { id } = req.params as IsValidUuidSchema;

    const eventRegistration = await prisma.eventRegisteration.findFirst({
        where: { id },
        select: {
            status: true,
            user: { select: { id: true, email: true, name: true } },
            ticket: {
                select: {
                    id: true,
                    status: true,
                    updatedAt: true,
                },
            },
        },
    });

    if (!eventRegistration || !eventRegistration.ticket) {
        return fail(
            res,
            ApiError.TicketInvalid,
            'Event registration is invalid or ticket does not exist'
        );
    }

    if (eventRegistration.ticket.status === TicketStatus.Confirmed) {
        const context = `Ticket for ${eventRegistration.user.email} was used at ${eventRegistration.ticket.updatedAt}`;
        return fail(res, ApiError.TicketClaimed, context);
    }

    await prisma.ticket.update({
        where: { id: eventRegistration.ticket.id },
        data: { status: TicketStatus.Confirmed },
    });

    const { body, status } = createResponse(ResponseType.Success, {
        message: 'Ticket successfully checked in',
        time: new Date(),
    });

    res.status(status).json(body);
}

async function deleteEVentRegistration(req: Request, res: Response) {
    const { id }: IsValidUuidSchema = req.params as IsValidUuidSchema;

    await prisma.ticket.deleteMany({
        where: { event_registration: { id } },
    });
    const eventRegistrations = await prisma.eventRegisteration.delete({
        where: { id },
    });

    const { body, status } = createResponse(
        ResponseType.Success,
        eventRegistrations
    );

    res.status(status).json(body);
}

export const eventsRouter = router;
