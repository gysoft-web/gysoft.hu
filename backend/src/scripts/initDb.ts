import db from '../config/db.js';

export const initDb = async () => {
    // Initialize the database by creating necessary tables
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS applications
                (id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(40) NOT NULL UNIQUE,
                created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                note VARCHAR(500) NOT NULL UNIQUE,
                status VARCHAR(10) NOT NULL)
        `);
        console.log('Database initialized successfully!');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
};
