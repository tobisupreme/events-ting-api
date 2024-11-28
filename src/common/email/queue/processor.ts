import { Job } from 'bullmq';
import { prisma } from '../../../db';
import { emailEventRegistrationTicket } from '../../../tickets/ticket.service';
import { JOBS } from './interfaces';

interface BulkAccountTransferRequest {
    transferIds: string[];
    email: string;
    subject: string;
    html: string;
}

export interface EmailSingleEventRegistrationTicket {
    eventRegistrationId: string;
}

async function processBulkTicketRegistrations({
    data,
}: Job<BulkAccountTransferRequest>) {
    const registrations = await prisma.eventRegisteration.findMany({
        where: { status: true },
    });
    if (!registrations?.length) {
        return 'No registrations found';
    }

    for await (const registration of registrations) {
        return await emailEventRegistrationTicket({
            eventRegistrationId: registration.id,
        });
    }
}

async function emailSingleEventRegistrationTicket({
    data,
}: Job<EmailSingleEventRegistrationTicket>) {
    return await emailEventRegistrationTicket(data);
}

export default async function jobProcessor(job: Job): Promise<any> {
    switch (job.name) {
        case JOBS.BULK_EMAIL_TICKET_REGISTRATIONS:
            return processBulkTicketRegistrations(job);
        case JOBS.EMAIL_TICKET_REGISTRATION:
            return emailSingleEventRegistrationTicket(job);
        default:
            throw new Error('Invalid job name');
    }
}
