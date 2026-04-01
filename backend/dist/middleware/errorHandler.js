"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res) => {
    if (err instanceof Error) {
        res.status(500).json({ error: 'Server error' });
    }
    else {
        res.status(500).json({ error: 'Server error: Unknown error' });
    }
};
exports.errorHandler = errorHandler;
