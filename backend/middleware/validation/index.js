// Custom Lightweight Request Validation Middleware

exports.validateRegister = (req, res, next) => {
    const { name, email, password, role } = req.body;
    if (!name || typeof name !== "string" || name.length < 2) return res.status(400).json({ error: "Invalid name" });
    if (!email || typeof email !== "string" || !email.includes("@")) return res.status(400).json({ error: "Invalid email" });
    if (!password || typeof password !== "string" || password.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters" });
    if (!role || !["student", "teacher", "community_head", "admin"].includes(role)) return res.status(400).json({ error: "Invalid role" });
    next();
};

exports.validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || typeof email !== "string" || !email.includes("@")) return res.status(400).json({ error: "Invalid email" });
    if (!password || typeof password !== "string") return res.status(400).json({ error: "Invalid password format" });
    next();
};

exports.validatePostCreation = (req, res, next) => {
    const { title, content } = req.body;
    if (!title || typeof title !== "string" || title.trim().length === 0) return res.status(400).json({ error: "Title is required" });
    if (!content || typeof content !== "string" || content.trim().length === 0) return res.status(400).json({ error: "Content is required" });
    next();
};

exports.validateEventCreation = (req, res, next) => {
    const { title, description, date, location } = req.body;
    if (!title || typeof title !== "string" || title.trim().length === 0) return res.status(400).json({ error: "Title is required" });
    if (!description || typeof description !== "string") return res.status(400).json({ error: "Invalid description" });
    if (!date || isNaN(Date.parse(date))) return res.status(400).json({ error: "Invalid date format" });
    if (!location || typeof location !== "string") return res.status(400).json({ error: "Invalid location" });
    next();
};

exports.validateMeetingCreation = (req, res, next) => {
    const { teacher_id, message } = req.body;
    if (!teacher_id || typeof teacher_id !== "number") return res.status(400).json({ error: "Invalid teacher_id" });
    if (!message || typeof message !== "string" || message.trim().length === 0) return res.status(400).json({ error: "Message is required" });
    next();
};

exports.validateAttendanceUpdate = (req, res, next) => {
    const { attended_classes, total_classes } = req.body;
    if (typeof attended_classes !== "number" || attended_classes < 0) return res.status(400).json({ error: "Invalid attended_classes" });
    if (typeof total_classes !== "number" || total_classes < 0 || attended_classes > total_classes) return res.status(400).json({ error: "Invalid total_classes" });
    next();
};
