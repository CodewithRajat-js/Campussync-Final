const pool = require("../config/db");

// Student creates a meeting request
const createMeetingRequest = async (req, res) => {
    try {
        const teacher_id = req.body.teacher_id;
        const message = req.body.message;

        if (!teacher_id || !message) {
            return res.status(400).json({ error: "Teacher ID and message are required" });
        }

        const result = await pool.query(
            "INSERT INTO meeting_requests (student_id, teacher_id, message, status) VALUES ($1, $2, $3, 'pending') RETURNING *",
            [req.user.id, teacher_id, message]
        );

        res.status(201).json({
            message: "Meeting request sent",
            request: result.rows[0]
        });
    } catch (error) {
        console.error("Create meeting request error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Teacher views their meeting requests
const getTeacherRequests = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const result = await pool.query(
            `SELECT mr.id, mr.message, mr.status, mr.created_at,
                    u.name AS student_name, u.email AS student_email
             FROM meeting_requests mr
             JOIN users u ON mr.student_id = u.id
             WHERE mr.teacher_id = $1
             ORDER BY mr.created_at DESC
             LIMIT $2 OFFSET $3`,
            [req.user.id, limit, offset]
        );
        res.json({
            data: result.rows,
            page,
            limit
        });
    } catch (error) {
        console.error("Get teacher requests error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Teacher approves or rejects a request
const updateMeetingStatus = async (req, res) => {
    try {
        const requestId = req.params.id;
        const status = req.body.status;

        if (!status || !["approved", "rejected"].includes(status)) {
            return res.status(400).json({ error: "Status must be 'approved' or 'rejected'" });
        }

        const existing = await pool.query(
            "SELECT id FROM meeting_requests WHERE id = $1 AND teacher_id = $2",
            [requestId, req.user.id]
        );

        if (existing.rows.length === 0) {
            return res.status(404).json({ error: "Meeting request not found" });
        }

        await pool.query(
            "UPDATE meeting_requests SET status = $1 WHERE id = $2",
            [status, requestId]
        );

        res.json({ message: "Meeting request " + status });
    } catch (error) {
        console.error("Update meeting status error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { createMeetingRequest, getTeacherRequests, updateMeetingStatus };
