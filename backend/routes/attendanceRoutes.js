const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const { getAttendance, createSubject, updateAttendance } = require("../controllers/attendanceController");
const { validateAttendanceUpdate } = require("../middleware/validation");

// GET /api/attendance — get user's attendance
router.get("/", authenticateToken, getAttendance);

// POST /api/attendance — create subject
router.post("/", authenticateToken, createSubject);

// PATCH /api/attendance/:id — update class counts
router.patch("/:id", authenticateToken, validateAttendanceUpdate, updateAttendance);

module.exports = router;
