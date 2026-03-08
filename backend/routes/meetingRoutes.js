const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRoles } = require("../middleware/authMiddleware");
const { createMeetingRequest, getTeacherRequests, updateMeetingStatus } = require("../controllers/meetingController");
const { validateMeetingCreation } = require("../middleware/validation");

// POST /api/meetings — student creates request
router.post("/", authenticateToken, validateMeetingCreation, createMeetingRequest);

// GET /api/meetings — teacher views requests
router.get("/", authenticateToken, authorizeRoles("teacher"), getTeacherRequests);

// PATCH /api/meetings/:id — teacher approves/rejects
router.patch("/:id", authenticateToken, authorizeRoles("teacher"), updateMeetingStatus);

module.exports = router;
