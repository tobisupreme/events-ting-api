import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextFunction, Request, Response } from 'express';

export enum ApiError {
    BodyMissing = 'error.api.body_missing',
    BodyInvalid = 'error.api.body_invalid',
    ParamInvalid = 'error.api.param_invalid',
    QueryInvalid = 'error.api.query_invalid',
    Generic = 'error.api.generic',
    InvalidOperation = 'error.api.operation_invalid',
    TicketClaimed = 'error.api.ticket_claimed',
    TicketInvalid = 'error.api.ticket_invalid',
    TicketDulicate = 'error.api.ticket_duplicate',
    TicketGenerationFailed = 'error.api.ticket_generation_failed',
}

export enum ResponseType {
    Error = 'error',
    Success = 'success',
    Critical = 'critical',
}

export function createResponse(responseType: ResponseType, responseData: any) {
    const internalError = (code?: string) => {
        return {
            status: 500,
            body: {
                status: 'error',
                error: {
                    code: code || 'error.api.crtical',
                },
                critical: true,
            },
        };
    };

    try {
        let status = 200,
            response = {};

        if (responseType === 'error') {
            status = 400;
        }

        switch (responseType) {
            case ResponseType.Error:
                response = {
                    error: {
                        code: responseData?.code,
                        context: responseData?.context,
                    },
                };
                break;

            case ResponseType.Success:
                response = {
                    data: responseData,
                };
                break;

            case ResponseType.Critical:
                return internalError(responseData?.code);

            default:
                throw 'unreachable';
        }

        return {
            status,
            body: {
                status: responseType,
                ...response,
            },
        };
    } catch (error) {
        return internalError();
    }
}

export function fail(res: Response, code?: string, context?: string) {
    const { status, body } = createResponse(ResponseType.Error, {
        code,
        context,
    });
    res.status(status).json(body);
}

export function errorHandler(
    error: any,
    __: Request,
    res: Response,
    ___: NextFunction
) {
    console.error(error);
    if (error instanceof PrismaClientKnownRequestError) {
        const context = 'error.db.operation';
        return fail(res, error.code, context);
    }
    return fail(res, ApiError.Generic);
}
