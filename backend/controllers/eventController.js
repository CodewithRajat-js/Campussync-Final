const pool = require("../config/db");

// Get all events
const getEvents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const result = await pool.query(
            "SELECT * FROM events ORDER BY date ASC LIMIT $1 OFFSET $2",
            [limit, offset]
        );
        res.json({
            data: result.rows,
            page,
            limit
        });
    } catch (error) {
        console.error("Get events error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Create event (community_head or admin only)
const createEvent = async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const date = req.body.date;
        const location = req.body.location;

        if (!title || !date || !location) {
            return res.status(400).json({ error: "Title, date, and location are required" });
        }

        const result = await pool.query(
            "INSERT INTO events (title, description, date, location, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [title, description || "", date, location, req.user.id]
        );

        res.status(201).json({
            message: "Event created successfully",
            event: result.rows[0]
        });
    } catch (error) {
        console.error("Create event error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Register for event (authenticated users)
const registerForEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user.id;

        // Check if event exists
        const event = await pool.query(
            "SELECT id FROM events WHERE id = $1",
            [eventId]
        );

        if (event.rows.length === 0) {
            return res.status(404).json({ error: "Event not found" });
        }

        // Check if already registered
        const existing = await pool.query(
            "SELECT id FROM event_registrations WHERE event_id = $1 AND user_id = $2",
            [eventId, userId]
        );

        if (existing.rows.length > 0) {
            return res.status(409).json({ error: "Already registered for this event" });
        }

        await pool.query(
            "INSERT INTO event_registrations (event_id, user_id) VALUES ($1, $2)",
            [eventId, userId]
        );

        res.status(201).json({ message: "Registered for event successfully" });
    } catch (error) {
        console.error("Register for event error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { getEvents, createEvent, registerForEvent };
