import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import RoleProtectedRoute from "../components/RoleProtectedRoute";

import Dashboard from "../features/dashboard/DashboardPage";
import Calendar from "../features/calendar/CalendarPage";
import Faculty from "../features/faculty/FacultyHubPage";
import Community from "../features/community/CommunityPage";
import Events from "../features/events/EventsPage";
import Attendance from "../features/attendance/AttendancePlannerPage";
import Admin from "../features/admin/AdminPage";
import CommunityHead from "../features/community/CommunityHeadPage";
import MeetingRequests from "../features/faculty/MeetingRequestsPage";
import EventDetails from "../features/events/EventDetailsPage";
import AdminModeration from "../features/admin/AdminModerationPage";
import Profile from "../features/profile/ProfilePage";

import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Auth Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Everyone authenticated gets access to Dashboard, Profile, and Calendar */}
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />

                {/* Shared endpoints, but still need auth */}
                <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
                <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
                <Route path="/events/:id" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />

                {/* Role-Specific: Student */}
                <Route path="/attendance" element={<RoleProtectedRoute roles={["student"]}><Attendance /></RoleProtectedRoute>} />

                {/* Role-Specific: Teacher */}
                <Route path="/faculty" element={<RoleProtectedRoute roles={["teacher", "student"]}><Faculty /></RoleProtectedRoute>} />
                <Route path="/meeting-requests" element={<RoleProtectedRoute roles={["teacher", "admin"]}><MeetingRequests /></RoleProtectedRoute>} />

                {/* Role-Specific: Admin */}
                <Route path="/admin" element={<RoleProtectedRoute roles={["admin"]}><Admin /></RoleProtectedRoute>} />
                <Route path="/admin/moderation" element={<RoleProtectedRoute roles={["admin"]}><AdminModeration /></RoleProtectedRoute>} />

                {/* Role-Specific: Community Head & Admin */}
                <Route path="/community-head" element={<RoleProtectedRoute roles={["community_head", "admin"]}><CommunityHead /></RoleProtectedRoute>} />

            </Routes>
        </BrowserRouter>
    );
}
