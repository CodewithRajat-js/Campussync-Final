const pool = require("../config/db");

// Get attendance records for logged-in user
const getAttendance = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM attendance WHERE user_id = $1 ORDER BY created_at DESC",
            [req.user.id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Get attendance error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Create a subject
const createSubject = async (req, res) => {
    try {
        const subject = req.body.subject;

        if (!subject) {
            return res.status(400).json({ error: "Subject name is required" });
        }

        const result = await pool.query(
            "INSERT INTO attendance (user_id, subject, attended_classes, total_classes, percentage) VALUES ($1, $2, 0, 0, 0) RETURNING *",
            [req.user.id, subject]
        );

        res.status(201).json({
            message: "Subject created",
            record: result.rows[0]
        });
    } catch (error) {
        console.error("Create subject error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Update attendance
const updateAttendance = async (req, res) => {
    try {
        const recordId = req.params.id;
        const attended_classes = req.body.attended_classes;
        const total_classes = req.body.total_classes;

        if (attended_classes == null || total_classes == null) {
            return res.status(400).json({ error: "attended_classes and total_classes are required" });
        }

        if (total_classes === 0) {
            return res.status(400).json({ error: "total_classes cannot be zero" });
        }

        const percentage = ((attended_classes / total_classes) * 100).toFixed(2);

        const existing = await pool.query(
            "SELECT id FROM attendance WHERE id = $1 AND user_id = $2",
            [recordId, req.user.id]
        );

        if (existing.rows.length === 0) {
            return res.status(404).json({ error: "Attendance record not found" });
        }

        const result = await pool.query(
            "UPDATE attendance SET attended_classes = $1, total_classes = $2, percentage = $3 WHERE id = $4 RETURNING *",
            [attended_classes, total_classes, percentage, recordId]
        );

        res.json({
            message: "Attendance updated",
            record: result.rows[0],
            percentage: parseFloat(percentage)
        });
    } catch (error) {
        console.error("Update attendance error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { getAttendance, createSubject, updateAttendance };
