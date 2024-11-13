import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { parseData } from './parse.schema';
import { ApiError, fail } from './request.processing';

export const validateRequestBody = <T extends z.ZodTypeAny>(schema: T) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        const { success, data } = await parseData(req.body, schema);
        console.log('🚀 ~ return ~ success:', success);

        if (!success) {
            return fail(res, ApiError.BodyInvalid);
        }

        req.body = data;
        next();
    };
};
