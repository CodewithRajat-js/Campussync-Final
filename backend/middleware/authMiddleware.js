const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "campussync_secret_key";

// Verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ error: "Access denied. No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};

// Role-based access control
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Access denied. Insufficient permissions" });
        }
        next();
    };
};

module.exports = { authenticateToken, authorizeRoles };
