const pool = require("../config/db");

// Create post (status = pending)
const createPost = async (req, res) => {
    try {
        const title = req.body.title;
        const content = req.body.content;

        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required" });
        }

        const result = await pool.query(
            "INSERT INTO posts (title, content, author_id, status) VALUES ($1, $2, $3, 'pending') RETURNING *",
            [title, content, req.user.id]
        );

        res.status(201).json({
            message: "Post submitted for approval",
            post: result.rows[0]
        });
    } catch (error) {
        console.error("Create post error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Get approved posts only
const getApprovedPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const result = await pool.query(
            "SELECT id, title, content, created_at, author_id FROM posts WHERE status = 'approved' ORDER BY created_at DESC LIMIT $1 OFFSET $2",
            [limit, offset]
        );
        res.json({
            data: result.rows,
            page,
            limit
        });
    } catch (error) {
        console.error("Get posts error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Approve post (admin only)
const approvePost = async (req, res) => {
    try {
        const postId = req.params.id;

        const existing = await pool.query(
            "SELECT id FROM posts WHERE id = $1",
            [postId]
        );

        if (existing.rows.length === 0) {
            return res.status(404).json({ error: "Post not found" });
        }

        await pool.query(
            "UPDATE posts SET status = 'approved' WHERE id = $1",
            [postId]
        );

        res.json({ message: "Post approved successfully" });
    } catch (error) {
        console.error("Approve post error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { createPost, getApprovedPosts, approvePost };
