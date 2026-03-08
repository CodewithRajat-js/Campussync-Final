-- Database Index Optimization Script for CampusSync

-- Index for filtering approved posts
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);

-- Index for ordering events chronologically
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);

-- Index for querying meeting requests by target teacher
CREATE INDEX IF NOT EXISTS idx_meeting_requests_teacher_id ON meeting_requests(teacher_id);

-- Index for rapidly filtering and paginating notifications by user
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
