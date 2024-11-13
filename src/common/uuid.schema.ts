import { z } from 'zod';

export const IsValidUuidSchema = z
    .object({
        id: z.string().uuid(),
    })
    .strict();
export type IsValidUuidSchema = z.infer<typeof IsValidUuidSchema>;
