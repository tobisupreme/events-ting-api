import { Job } from 'bullmq';
import {
    /* emailEventRegistrationTicket, */
    emailEventRegistrationTicket,
} from '../../../tickets/ticket.service';
import { JOBS } from './interfaces';

export interface EmailSingleEventRegistrationTicket {
    eventRegistrationId: string;
}

export interface BulkEmailEventRegistrationTicket {
    ids: string[];
}

async function processBulkTicketRegistrations({
    data,
}: Job<BulkEmailEventRegistrationTicket>) {
    if (!data.ids?.length) {
        return 'No registrations found';
    }

    const promises = data.ids.map((eventRegistrationId) =>
        emailEventRegistrationTicket({ eventRegistrationId })
    );
    return await Promise.all(promises);
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
