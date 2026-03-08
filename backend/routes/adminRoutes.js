const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRoles } = require("../middleware/authMiddleware");
const { getDashboardStats, getPendingPosts, getPendingMeetings } = require("../controllers/adminController");

// GET /api/admin/stats
router.get("/stats", authenticateToken, authorizeRoles("admin"), getDashboardStats);

// GET /api/admin/posts/pending
router.get("/posts/pending", authenticateToken, authorizeRoles("admin"), getPendingPosts);

// GET /api/admin/meetings/pending
router.get("/meetings/pending", authenticateToken, authorizeRoles("admin"), getPendingMeetings);

module.exports = router;
