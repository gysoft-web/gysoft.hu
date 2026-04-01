"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
const requireEnv = (name) => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is required`);
    }
    return value;
};
exports.config = {
    dbHost: requireEnv('DB_HOST'), // set the database host
    dbUser: requireEnv('DB_USER'), // set the database user
    dbPassword: requireEnv('DB_PASSWORD'), // set the database password
    dbName: requireEnv('DB_NAME'), // set the database name
    dbPort: Number(process.env.DB_PORT || '5432'), // set the database port
    port: Number(process.env.PORT || '3030'), // set the server port
    rateLimitWindow: Number(process.env.RATE_LIMIT_WINDOW || '1'), // in minutes
    rateLimitMax: Number(process.env.RATE_LIMIT_MAX || '100'), // max requests per window
};
