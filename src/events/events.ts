import { Prisma, TicketStatus } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from 'zod';
import {
    ApiError,
    createResponse,
    fail,
    IsValidUuidSchema,
    ResponseType,
} from '../common';
import { prisma } from '../db';
import {
    CheckInUserForEventSchema,
    EventSchema,
    FindEventRegistrationsSchema,
    FindOneEventRegistrationSchema,
} from './events.schema';

export async function getEvents(req: Request, res: Response) {
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

export async function getEvent(req: Request, res: Response) {
    const { id }: IsValidUuidSchema = req.params as IsValidUuidSchema;

    const event = await prisma.event.findUniqueOrThrow({ where: { id } });
    const { body, status } = createResponse(ResponseType.Success, event);

    res.status(status).json(body);
}

export async function addEvent(req: Request, res: Response) {
    const normalizedData: EventSchema = req.body;
    const createdEvent = await prisma.event.create({
        data: normalizedData,
    });

    const { body, status } = createResponse(ResponseType.Success, createdEvent);

    res.status(status).json(body);
}

export async function getEventRegistrations(req: Request, res: Response) {
    const { id: eventId }: IsValidUuidSchema = req.params as IsValidUuidSchema;
    const { status: registrationStatus, term }: FindEventRegistrationsSchema = (
        req as any
    ).validatedQuery;

    const queryArgs: Prisma.EventRegisterationFindManyArgs = {
        where: {
            eventId,
            ...(term && {
                OR: [
                    {
                        user: {
                            name: {
                                contains: term as string,
                                mode: 'insensitive',
                            },
                        },
                    },
                    {
                        user: {
                            email: {
                                contains: term as string,
                                mode: 'insensitive',
                            },
                        },
                    },
                ],
            }),
            ...(registrationStatus && {
                ticket: { status: registrationStatus },
            }),
        },
    };

    const eventRegistrations = await prisma.eventRegisteration.findMany({
        where: { ...queryArgs.where },
        select: {
            id: true,
            createdAt: true,
            status: true,
            user: { select: { id: true, email: true, name: true } },
            event: { select: { id: true, name: true } },
            tickets: {
                select: {
                    ticketId: true,
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

export async function getEventRegistration(req: Request, res: Response) {
    const { id, ticketIdOrEmail } =
        req.params as FindOneEventRegistrationSchema;

    const isEmail = z.string().email().safeParse(ticketIdOrEmail).success;
    const queryObj: Prisma.EventRegisterationFindFirstArgs = {
        select: {
            id: true,
            createdAt: true,
            status: true,
            user: { select: { id: true, email: true, name: true } },
            event: { select: { id: true, name: true } },
            numberOfTickets: true,
            tickets: {
                select: {
                    ticketId: true,
                    barcodeData: true,
                    status: true,
                },
            },
        },
        where: {
            event: { id },
            ...(isEmail
                ? { user: { email: ticketIdOrEmail } }
                : { tickets: { some: { ticketId: ticketIdOrEmail } } }),
        },
    };

    const eventRegistration = await prisma.eventRegisteration.findFirst(
        queryObj
    );

    if (!eventRegistration) {
        return fail(
            res,
            ApiError.NotFound,
            'Oops! Event registration details not found 😢'
        );
    }

    const { body, status } = createResponse(
        ResponseType.Success,
        eventRegistration
    );

    res.status(status).json(body);
}

export async function checkInEventRegistration(req: Request, res: Response) {
    const { ticketIdOrEmail: ticketIdentifier } =
        req.params as FindOneEventRegistrationSchema;
    const reqBody: CheckInUserForEventSchema = req.body;
    const ticket = await prisma.ticket.findUnique({
        where: { ticketId: ticketIdentifier },
        include: { eventRegistration: { include: { user: true } } },
    });

    if (!ticket) {
        return fail(res, ApiError.TicketInvalid);
    }

    if (ticket.status !== TicketStatus.Pending) {
        const context = `Ticket for ${ticket.eventRegistration.user.email} was used at ${ticket.updatedAt}`;
        return fail(res, ApiError.TicketClaimed, context);
    }

    await prisma.ticket.update({
        where: { id: ticket.id },
        data: { status: reqBody.status },
    });

    const { body, status } = createResponse(ResponseType.Success, {
        message: 'Ticket successfully checked in',
        time: new Date(),
    });

    res.status(status).json(body);
}
