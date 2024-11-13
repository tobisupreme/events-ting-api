import { z } from 'zod';

export async function parseData<T extends z.ZodTypeAny>(
    data: unknown,
    schema: T
) {
    return (await schema.safeParseAsync(data)) as {
        success: boolean;
        data?: z.infer<T>;
    };
}
