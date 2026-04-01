import app from './app.js';
import db from './config/db.js';
import { config } from './config/env.js';
import { initDb } from './scripts/initDb.js';

const PORT = config.port; // Use port from config

const server = app.listen(PORT, async () => {
    await initDb(); // Initialize the database before starting the server
    console.log(`Server running on http://localhost:${PORT}/api/`);
    console.log(`Swagger running on http://localhost:${PORT}/api/docs`);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1); // Exit the process to avoid undefined behavior
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1); // Exit the process to avoid undefined behavior
});

process.on('SIGINT', () => gracefulShutdown());
process.on('SIGTERM', () => gracefulShutdown());

const gracefulShutdown = async () => {
    console.log('Received SIGTERM. Shutting down gracefully...');
    server.close(async () => {
        await db.end();
        console.log('Database pool closed.');
        process.exit(0);
    });
    process.exit(0);
};
