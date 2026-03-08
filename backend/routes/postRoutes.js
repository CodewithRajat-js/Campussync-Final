const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRoles } = require("../middleware/authMiddleware");
const { createPost, getApprovedPosts, approvePost } = require("../controllers/postController");
const { validatePostCreation } = require("../middleware/validation");

// GET /api/posts — public (approved only)
router.get("/", getApprovedPosts);

// POST /api/posts — authenticated users create posts
router.post("/", authenticateToken, validatePostCreation, createPost);

// PATCH /api/posts/:id/approve — admin only
router.patch("/:id/approve", authenticateToken, authorizeRoles("admin"), approvePost);

module.exports = router;
