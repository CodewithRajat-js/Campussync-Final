const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRoles } = require("../middleware/authMiddleware");

// GET /api/test/student — requires valid JWT
router.get("/student", authenticateToken, (req, res) => {
    res.json({
        message: "Welcome, student!",
        user: req.user
    });
});

// GET /api/test/admin — requires JWT + admin role
router.get("/admin", authenticateToken, authorizeRoles("admin"), (req, res) => {
    res.json({
        message: "Welcome, admin!",
        user: req.user
    });
});

module.exports = router;
