import { EmailOptions, EmailService } from './index';
import { EmailTemplates, EventTicketEmailContext } from './templates';

export class MailerService {
    constructor(private readonly emailService: EmailService) {}

    /**
     * Sends an event ticket email to an attendee
     */
    async sendEventTicket(
        to: string,
        context: EventTicketEmailContext
    ): Promise<void> {
        const options: EmailOptions = {
            to,
            subject: `Your Ticket for ${context.eventName}`,
            templateName: EmailTemplates.EVENT_REGISTRATION,
            context: { ...context, cidForbarcodeUrl: 'cid:qr-code@event' },
            ...(context.barcodeUrl && {
                attachments: [
                    {
                        filename: 'qr-code.png',
                        content: Buffer.from(
                            context.barcodeUrl.split(',')[1],
                            'base64'
                        ),
                        cid: 'qr-code@event',
                    },
                ],
            }),
        };

        return await this.emailService.sendEmail(options);
    }

    /**
     * Sends event tickets to multiple attendees
     */
    async sendBulkEventTickets(
        recipients: Array<{ email: string; context: EventTicketEmailContext }>
    ): Promise<void> {
        const sendPromises = recipients.map(({ email, context }) =>
            this.sendEventTicket(email, context)
        );

        await Promise.all(sendPromises);
    }

    /**
     * Sends a custom notification email
     */
    async sendCustomEmail(
        to: string | string[],
        subject: string,
        templateName: string,
        context: Record<string, any>
    ): Promise<void> {
        const options: EmailOptions = {
            to,
            subject,
            templateName,
            context,
        };

        return await this.emailService.sendEmail(options);
    }
}

export const mailerService = new MailerService(new EmailService());
