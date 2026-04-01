import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const dateTime = new Date().toISOString().split('Z')[0].split('T');
    const date = dateTime[0];
    const time = dateTime[1].split('.')[0];
    res.on('finish', () => {
        const duration: number = Date.now() - start;
        const logLevel = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';
        console[logLevel](
            `[${date}  ${time}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms)`,
        );
    });

    next();
};
