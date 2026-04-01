"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const requestLogger = (req, res, next) => {
    const start = Date.now();
    const dateTime = new Date().toISOString().split('Z')[0].split('T');
    const date = dateTime[0];
    const time = dateTime[1].split('.')[0];
    res.on('finish', () => {
        const duration = Date.now() - start;
        const logLevel = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';
        console[logLevel](`[${date}  ${time}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms)`);
    });
    next();
};
exports.requestLogger = requestLogger;
