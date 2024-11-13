import { z } from 'zod';
import { IsValidUuidSchema } from '../common';

export const ClaimTicketSchema = IsValidUuidSchema;
export type ClaimTicketSchema = z.infer<typeof ClaimTicketSchema>;

export const GenerateTicketSchema = z
    .object({
        eventRegistrationId: z.string().uuid(),
    })
    .strict();
export type GenerateTicketSchema = z.infer<typeof GenerateTicketSchema>;
