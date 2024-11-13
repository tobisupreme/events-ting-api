import { z } from 'zod';

export const CreateUserSchema = z.object({
    name: z.string(),
    age: z.number(),
    email: z.string().email(),
});
export type CreateUser = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = CreateUserSchema.partial().extend({
    id: z.string().uuid(),
});
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
