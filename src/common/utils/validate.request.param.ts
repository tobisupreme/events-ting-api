import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { parseData } from './parse.schema';
import { ApiError, fail } from './request.processing';

export const validateRequestParam = <T extends z.ZodTypeAny>(schema: T) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { success, data } = await parseData(req.params, schema);

        if (!success) {
            return fail(res, ApiError.ParamInvalid);
        }

        req.params = data ? data : req.params;
        next();
    };
};
