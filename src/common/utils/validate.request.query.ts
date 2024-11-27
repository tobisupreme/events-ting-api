import { NextFunction, Response } from 'express';
import { z } from 'zod';
import { parseData } from './parse.schema';
import { ApiError, fail } from './request.processing';

export const validateRequestQuery = <T extends z.ZodTypeAny>(schema: T) => {
    return async (req: any, res: Response, next: NextFunction) => {
        const { success, data } = await parseData(req.query, schema);

        if (!success) {
            return fail(res, ApiError.QueryInvalid);
        }

        req.validatedQuery = data;
        next();
    };
};
