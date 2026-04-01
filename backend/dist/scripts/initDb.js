"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = void 0;
const db_js_1 = __importDefault(require("../config/db.js"));
const initDb = async () => {
    // Initialize the database by creating necessary tables
    try {
        await db_js_1.default.query(`
            CREATE TABLE IF NOT EXISTS applications
                (id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(40) NOT NULL UNIQUE,
                created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                status VARCHAR(10) NOT NULL)
        `);
        console.log('Database initialized successfully!');
    }
    catch (err) {
        console.error('Error initializing database:', err);
    }
};
exports.initDb = initDb;
