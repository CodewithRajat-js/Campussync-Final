const pool = require("../config/db");

// Get notifications for logged-in user
const getUserNotifications = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const result = await pool.query(
            "SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
            [req.user.id, limit, offset]
        );
        res.json({
            data: result.rows,
            page,
            limit
        });
    } catch (error) {
        console.error("Get notifications error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Mark notification as read
const markNotificationRead = async (req, res) => {
    try {
        const notifId = req.params.id;

        const existing = await pool.query(
            "SELECT id FROM notifications WHERE id = $1 AND user_id = $2",
            [notifId, req.user.id]
        );

        if (existing.rows.length === 0) {
            return res.status(404).json({ error: "Notification not found" });
        }

        await pool.query(
            "UPDATE notifications SET is_read = true WHERE id = $1",
            [notifId]
        );

        res.json({ message: "Notification marked as read" });
    } catch (error) {
        console.error("Mark read error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Create notification (used internally by other controllers)
const createNotification = async (userId, message) => {
    try {
        await pool.query(
            "INSERT INTO notifications (user_id, message) VALUES ($1, $2)",
            [userId, message]
        );
    } catch (error) {
        console.error("Create notification error:", error.message);
    }
};

module.exports = { getUserNotifications, markNotificationRead, createNotification };
