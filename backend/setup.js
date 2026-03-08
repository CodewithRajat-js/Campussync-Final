require("dotenv").config();
const pool = require("./config/db");

async function setup() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(50) NOT NULL DEFAULT 'student',
                created_at TIMESTAMP DEFAULT NOW()
            )
        `);
        console.log("Users table ready");

        await pool.query(`
            CREATE TABLE IF NOT EXISTS events (
                id SERIAL PRIMARY KEY,
                title VARCHAR(200) NOT NULL,
                description TEXT DEFAULT '',
                date VARCHAR(100) NOT NULL,
                location VARCHAR(200) NOT NULL,
                created_by INTEGER REFERENCES users(id),
                created_at TIMESTAMP DEFAULT NOW()
            )
        `);
        console.log("Events table ready");

        await pool.query(`
            CREATE TABLE IF NOT EXISTS event_registrations (
                id SERIAL PRIMARY KEY,
                event_id INTEGER REFERENCES events(id),
                user_id INTEGER REFERENCES users(id),
                registered_at TIMESTAMP DEFAULT NOW(),
                UNIQUE(event_id, user_id)
            )
        `);
        console.log("Event registrations table ready");

        await pool.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                title VARCHAR(200) NOT NULL,
                content TEXT NOT NULL,
                author_id INTEGER REFERENCES users(id),
                status VARCHAR(20) DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT NOW()
            )
        `);
        console.log("Posts table ready");

        await pool.query(`
            CREATE TABLE IF NOT EXISTS meeting_requests (
                id SERIAL PRIMARY KEY,
                student_id INTEGER REFERENCES users(id),
                teacher_id INTEGER REFERENCES users(id),
                message TEXT NOT NULL,
                status VARCHAR(20) DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT NOW()
            )
        `);
        console.log("Meeting requests table ready");

        await pool.query(`
            CREATE TABLE IF NOT EXISTS attendance (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                subject VARCHAR(200) NOT NULL,
                attended_classes INTEGER DEFAULT 0,
                total_classes INTEGER DEFAULT 0,
                percentage DECIMAL(5,2) DEFAULT 0,
                created_at TIMESTAMP DEFAULT NOW()
            )
        `);
        console.log("Attendance table ready");

        await pool.query(`
            CREATE TABLE IF NOT EXISTS notifications (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                message TEXT NOT NULL,
                is_read BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT NOW()
            )
        `);
        console.log("Notifications table ready");

        process.exit(0);
    } catch (error) {
        console.error("Setup error:", error.message);
        process.exit(1);
    }
}

setup();
