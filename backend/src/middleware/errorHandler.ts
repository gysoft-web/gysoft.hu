import { Request, Response } from 'express';

export const errorHandler = (err: unknown, req: Request, res: Response) => {
    if (err instanceof Error) {
        res.status(500).json({ error: 'Server error' });
    } else {
        res.status(500).json({ error: 'Server error: Unknown error' });
    }
};
