const pool = require("../config/db");

// Get dashboard stats
const getDashboardStats = async (req, res) => {
    try {
        const users = await pool.query("SELECT COUNT(*) FROM users");
        const events = await pool.query("SELECT COUNT(*) FROM events");
        const posts = await pool.query("SELECT COUNT(*) FROM posts");
        const meetings = await pool.query("SELECT COUNT(*) FROM meeting_requests");

        res.json({
            totalUsers: parseInt(users.rows[0].count),
            totalEvents: parseInt(events.rows[0].count),
            totalPosts: parseInt(posts.rows[0].count),
            totalMeetingRequests: parseInt(meetings.rows[0].count)
        });
    } catch (error) {
        console.error("Dashboard stats error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Get pending posts
const getPendingPosts = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT p.id, p.title, p.content, p.created_at,
                    u.name AS author_name
             FROM posts p
             JOIN users u ON p.author_id = u.id
             WHERE p.status = 'pending'
             ORDER BY p.created_at DESC`
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Pending posts error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Get pending meetings
const getPendingMeetings = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT mr.id, mr.message, mr.status, mr.created_at,
                    s.name AS student_name,
                    t.name AS teacher_name
             FROM meeting_requests mr
             JOIN users s ON mr.student_id = s.id
             JOIN users t ON mr.teacher_id = t.id
             WHERE mr.status = 'pending'
             ORDER BY mr.created_at DESC`
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Pending meetings error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { getDashboardStats, getPendingPosts, getPendingMeetings };
