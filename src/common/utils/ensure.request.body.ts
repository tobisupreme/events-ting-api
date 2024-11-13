import { NextFunction, Request, Response } from 'express';
import { ApiError, fail } from './request.processing';

export function ensureRequestBody(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.body) {
        return fail(res, ApiError.BodyMissing);
    }

    return next();
}
