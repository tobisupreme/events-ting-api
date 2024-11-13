import { Request, Response, NextFunction } from 'express';
import { getServerTimeAsDate } from '../utils';

export const requestLogger = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { method, originalUrl, headers, ip, params, query, body } = req;

    const time = getServerTimeAsDate();
    const mHeaders = { ...headers };
    const mQuery = { ...query };
    const mBody = { ...body };

    console.log('%&%&%&%&%&%&%');
    console.log(`${time}`);
    console.log('url -->', `${method} ${originalUrl}`);
    console.log('headers -->', mHeaders);
    console.log('query -->', mQuery);
    console.log('body -->', mBody);
    console.log('%&%&%&%&%&%&%');
    next();
};
