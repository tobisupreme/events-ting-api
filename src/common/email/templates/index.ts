export enum EmailTemplates {
    EVENT_REGISTRATION = 'event-ticket',
}

export interface EventTicketEmailContext {
    attendeeName: string;
    eventName: string;
    eventDate: string;
    eventTime: string;
    venue: string;
    ticketType: string;
    ticketId: string;
    barcodeUrl: string;
    organizerName: string;
}

export type EmailTemplateContext = EventTicketEmailContext;
