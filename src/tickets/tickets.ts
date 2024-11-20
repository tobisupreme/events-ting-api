import { TicketStatus } from '@prisma/client';
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
} from '../common';
import { prisma } from '../db';
import { ClaimTicketSchema, GenerateTicketSchema } from './tickets.schema';

const router = Router();

router.route('/').get(findAllTickets);

router
    .route('/check-in')
    .post(
        ensureRequestBody,
        validateRequestBody(ClaimTicketSchema),
        claimTicket
    );

router
    .route('/generate')
    .post(
        ensureRequestBody,
        validateRequestBody(GenerateTicketSchema),
        generateEventRegistrationTicket
    );

async function claimTicket(req: Request, res: Response) {
    const { id } = req.body as IsValidUuidSchema;

    const ticket = await prisma.ticket.findUnique({
        where: { id },
    });

    if (!ticket || ticket.status === TicketStatus.Void) {
        return fail(res, ApiError.TicketInvalid);
    }
    if (ticket.status === TicketStatus.Claimed) {
        return fail(res, ApiError.TicketClaimed);
    }

    const data = await prisma.ticket.update({
        where: { id, status: TicketStatus.Pending },
        data: {
            status: TicketStatus.Claimed,
        },
    });

    const { body, status } = createResponse(ResponseType.Success, data.status);

    res.status(status).json(body);
}

async function generateEventRegistrationTicket(req: Request, res: Response) {
    const { eventRegistrationId } = req.body as GenerateTicketSchema;

    const barcodeData = await generateQRCode(eventRegistrationId);
    if (!barcodeData) {
        return fail(res, ApiError.TicketGenerationFailed);
    }

    const data = await prisma.ticket.create({
        data: {
            eventRegistrationId,
            barcodeData,
        },
    });

    const { body, status } = createResponse(ResponseType.Success, data);

    res.status(status).json(body);
}

async function findAllTickets(req: Request, res: Response) {
    const tickets = await prisma.ticket.findMany({
        include: {
            event_registration: { include: { user: true, event: true } },
        },
    });

    const { body, status } = createResponse(ResponseType.Success, tickets);

    res.status(status).json(body);
}

export const ticketsRouter = router;
