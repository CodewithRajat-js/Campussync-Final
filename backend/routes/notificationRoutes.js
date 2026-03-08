const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const { getUserNotifications, markNotificationRead } = require("../controllers/notificationController");

// GET /api/notifications — get user's notifications
router.get("/", authenticateToken, getUserNotifications);

// PATCH /api/notifications/:id/read — mark as read
router.patch("/:id/read", authenticateToken, markNotificationRead);

module.exports = router;
