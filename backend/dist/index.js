"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const db_js_1 = __importDefault(require("./config/db.js"));
const env_js_1 = require("./config/env.js");
const initDb_js_1 = require("./scripts/initDb.js");
const PORT = env_js_1.config.port; // Use port from config
const server = app_js_1.default.listen(PORT, async () => {
    await (0, initDb_js_1.initDb)(); // Initialize the database before starting the server
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
        await db_js_1.default.end();
        console.log('Database pool closed.');
        process.exit(0);
    });
    process.exit(0);
};
