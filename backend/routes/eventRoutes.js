const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRoles } = require("../middleware/authMiddleware");
const { getEvents, createEvent, registerForEvent } = require("../controllers/eventController");
const { validateEventCreation } = require("../middleware/validation");

// GET /api/events — public
router.get("/", getEvents);

// POST /api/events — community_head or admin only
router.post("/", authenticateToken, authorizeRoles("community_head", "admin"), validateEventCreation, createEvent);

// POST /api/events/:id/register — authenticated users
router.post("/:id/register", authenticateToken, registerForEvent);

module.exports = router;
