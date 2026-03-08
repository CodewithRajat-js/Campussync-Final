const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const JWT_SECRET = process.env.JWT_SECRET || "campussync_secret_key";

// Register user
const registerUser = async (req, res) => {
    try {
        console.log("Register request body:", req.body);

        // Safety check
        if (!req.body) {
            return res.status(400).json({ error: "Request body is empty" });
        }

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if user already exists
        const existing = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (existing.rows.length > 0) {
            return res.status(409).json({ error: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user
        await pool.query(
            "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
            [name, email, hashedPassword, role]
        );

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Register error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        console.log("Login request body:", req.body);

        if (!req.body) {
            return res.status(400).json({ error: "Request body is empty" });
        }

        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find user
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = result.rows[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { registerUser, loginUser };
