import { z } from 'zod';

export const IsValidTermSchema = z
    .object({
        term: z.string().optional(),
    })
    .strict();
export type IsValidTermSchema = z.infer<typeof IsValidTermSchema>;
