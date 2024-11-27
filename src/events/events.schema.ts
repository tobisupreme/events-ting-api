import { TicketStatus } from '@prisma/client';
import { z } from 'zod';
import { IsValidTermSchema } from '../common/term.schema';

export const EventSchema = z
    .object({
        name: z.string().max(50),
        startDate: z.coerce.date(),
        endDate: z.coerce.date().optional(),
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
