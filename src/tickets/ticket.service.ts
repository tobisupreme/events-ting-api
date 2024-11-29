import { MessageLogStatus } from '@prisma/client';
import fs from 'fs/promises';
import moment from 'moment';
import { ApiError, generateQRCode } from '../common';
import { mailerService } from '../common/email/mailer.service';
import { EmailSingleEventRegistrationTicket } from '../common/email/queue/processor';
import { EventTicketEmailContext } from '../common/email/templates';
import { generateTicketId } from '../common/utils/generate-ticket-id';
import { prisma } from '../db';

export async function generateEventRegistrationTicket(
    eventRegistrationId: string
) {
    const eventRegistration = await prisma.eventRegisteration.findUnique({
        where: { id: eventRegistrationId, status: true },
        include: { event: true },
    });
    if (!eventRegistration) {
        throw new Error(ApiError.NotFound);
    }
    const numberOfTickets = eventRegistration.numberOfTickets;
    const ticketsPromise = new Array(numberOfTickets).fill('').map(async () => {
        const ticketId = generateTicketId();
        const barcodeData = await generateQRCode(ticketId);
        return prisma.ticket.create({
            data: {
                eventRegistrationId,
                barcodeData,
                ticketId,
            },
        });
    });

    await Promise.all(ticketsPromise);
}

export async function emailEventRegistrationTicket({
    eventRegistrationId,
}: EmailSingleEventRegistrationTicket) {
    const registration = await prisma.eventRegisteration.findFirst({
        where: {
            id: eventRegistrationId,
            tickets: { none: { barcodeData: null } },
        },
        select: {
            user: { select: { email: true, name: true } },
            event: {
                select: {
                    name: true,
                    startDate: true,
                    organizer: true,
                    venue: true,
                },
            },
            tickets: { select: { ticketId: true, barcodeData: true } },
            emailSent: true,
        },
    });
    if (!registration) {
        throw new Error(ApiError.TicketInvalid);
    }
    if (registration.emailSent) {
        const message = 'Email already sent';
        console.log(message);
        return message;
    }

    type Registration = NonNullable<typeof registration>;
    function mapTicketData(
        registration: Registration
    ): EventTicketEmailContext {
        const timeFromDate = moment(registration.event.startDate).format(
            'HH:mm a'
        );
        const dayFromDate = moment(registration.event.startDate).format(
            'MMMM DD, YYYY'
        );

        return {
            attendeeName: registration.user.name || '',
            eventName: registration.event.name,
            tickets: registration.tickets.map((ticket) => ({
                barcodeUrl: ticket.barcodeData!,
                ticketId: ticket.ticketId!,
                ticketType: 'VIP',
            })),
            eventDate: dayFromDate,
            eventTime: timeFromDate,
            organizerName: registration.event.organizer || '',
            venue: registration.event.venue!,
            totalTickets: registration.tickets.length,
        };
    }
    const emailContext = mapTicketData(registration);
    return mailerService
        .sendEventTicket(registration.user.email, emailContext)
        .then(async (result) => {
            await Promise.all([
                prisma.eventRegisteration.update({
                    where: { id: eventRegistrationId },
                    data: { emailSent: true },
                }),
                prisma.messageLog.create({
                    data: {
                        eventRegistrationId,
                        messageLogStatus: result?.rejected?.length
                            ? MessageLogStatus.NotSent
                            : MessageLogStatus.Sent,
                        raw: JSON.stringify(result),
                    },
                }),
                fs.appendFile(
                    'emailResult.txt',
                    `Result: ${JSON.stringify(result)}\n`
                ),
            ]);
            return result;
        })
        .catch(async (error) => {
            console.error('Error sending email:', error);
            await fs.appendFile('emailResult.txt', `Error: ${error.message}\n`);
            throw error;
        });
}
