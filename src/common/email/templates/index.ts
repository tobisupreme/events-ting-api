export enum EmailTemplates {
    EVENT_REGISTRATION = 'event-ticket',
}

export interface EventTicketEmailContext {
    attendeeName: string;
    eventName: string;
    eventDate: string;
    eventTime: string;
    venue: string;
    organizerName: string;
    totalTickets: number;
    tickets: Array<{
        ticketType: string;
        ticketId: string;
        barcodeUrl: string;
    }>;
}
export type EmailTemplateContext = EventTicketEmailContext;
