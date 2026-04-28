const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const dbPath = path.resolve(__dirname, process.env.DB_PATH || './database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.serialize(() => {
        // Users table
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                fullName TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                passwordHash TEXT NOT NULL,
                joinedDate DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Progress table
        db.run(`
            CREATE TABLE IF NOT EXISTS progress (
                user_id INTEGER PRIMARY KEY,
                total_points INTEGER DEFAULT 0,
                current_streak INTEGER DEFAULT 0,
                last_activity_date DATETIME,
                level1_completed BOOLEAN DEFAULT 0,
                level2_completed BOOLEAN DEFAULT 0,
                level3_completed BOOLEAN DEFAULT 0,
                level4_completed BOOLEAN DEFAULT 0,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        
        console.log('Database tables initialized.');
    });
}

module.exports = db;
