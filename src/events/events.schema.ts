import { EventType, TicketStatus } from '@prisma/client';
import { z } from 'zod';
import { IsValidTermSchema, IsValidUuidSchema } from '../common';

export const EventSchema = z
    .object({
        name: z.string().max(50),
        startDate: z.coerce.date(),
        endDate: z.coerce.date().optional(),
        venue: z.string().optional(),
        type: z.nativeEnum(EventType),
        organizer: z.string().optional(),
        metaData: z.any().optional(),
    })
    .strict();
export type EventSchema = z.infer<typeof EventSchema>;

export const RegisterUserForEventSchema = z
    .object({
        userId: z.string().uuid(),
        eventId: z.string().uuid(),
    })
    .strict();
export type RegisterUserForEventSchema = z.infer<
    typeof RegisterUserForEventSchema
>;

export const CheckInUserForEventSchema = z
    .object({
        status: z.enum([TicketStatus.Cancelled, TicketStatus.Confirmed]),
    })
    .strict();
export type CheckInUserForEventSchema = z.infer<
    typeof CheckInUserForEventSchema
>;

export const FindEventRegistrationsSchema = IsValidTermSchema.extend({
    status: z.nativeEnum(TicketStatus).optional(),
}).strict();
export type FindEventRegistrationsSchema = z.infer<
    typeof FindEventRegistrationsSchema
>;

export const FindOneEventRegistrationSchema = IsValidUuidSchema.extend({
    ticketIdOrEmail: z.string(),
});
export type FindOneEventRegistrationSchema = z.infer<
    typeof FindOneEventRegistrationSchema
>;
