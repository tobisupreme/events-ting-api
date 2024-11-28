import { ApiError, generateQRCode } from '../common';
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
