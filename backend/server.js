require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

// Middleware — MUST be before routes
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

// Request logging middleware
app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`[API] ${req.method} ${req.originalUrl} - ${duration}ms`);
    });
    next();
});

const allowedOrigins = [
    "http://localhost:5174",
    "http://localhost:5173",
    process.env.FRONTEND_URL
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }

        return callback(new Error("CORS not allowed"));
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/meetings", require("./routes/meetingRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));

// Health check
app.get("/", (req, res) => {
    res.json({ message: "CampusSync API is running" });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Unexpected Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
