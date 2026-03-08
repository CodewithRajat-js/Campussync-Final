import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../ui/Logo";

export default function Sidebar() {
    const { user } = useAuth();
    const role = user?.role;

    const base = "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200";
    const active = "bg-cocoa text-white shadow-md";
    const inactive = "text-gray-600 dark:text-gray-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-cocoa dark:hover:text-sand";

    return (
        <aside className="w-64 min-h-screen bg-white dark:bg-neutral-900 border-r border-gray-100 dark:border-neutral-800 p-6 flex flex-col transition-colors z-10">
            <div className="mb-10 pl-2">
                <Logo />
            </div>

            <nav className="flex flex-col gap-2">
                {/* Dashboard — visible to all roles */}
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
                >
                    <span className="text-lg">📊</span>
                    Dashboard
                </NavLink>

                {/* Student links */}
                {role === "student" && (
                    <>
                        <NavLink to="/events" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
                            <span className="text-lg">📅</span>
                            Events
                        </NavLink>
                        <NavLink to="/community" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
                            <span className="text-lg">💬</span>
                            Community
                        </NavLink>
                        <NavLink to="/attendance" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
                            <span className="text-lg">📅</span>
                            Attendance Planner
                        </NavLink>
                    </>
                )}

                {/* Teacher links */}
                {role === "teacher" && (
                    <>
                        <NavLink to="/faculty" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
                            <span className="text-lg">👩‍🏫</span>
                            Faculty Hub
                        </NavLink>
                        <NavLink to="/community" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
                            <span className="text-lg">💬</span>
                            Community
                        </NavLink>
                    </>
                )}

                {/* Admin links */}
                {role === "admin" && (
                    <>
                        <NavLink to="/admin" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
                            <span className="text-lg">⚙️</span>
                            Admin Panel
                        </NavLink>
                        <NavLink to="/admin/moderation" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
                            <span className="text-lg">🛡️</span>
                            Community Approvals
                        </NavLink>
                        <NavLink to="/meeting-requests" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
                            <span className="text-lg">🤝</span>
                            Meeting Requests
                        </NavLink>
                    </>
                )}

                {/* Community Head links */}
                {role === "community_head" && (
                    <>
                        <NavLink to="/community-head" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
                            <span className="text-lg">✨</span>
                            Create Event
                        </NavLink>
                        <NavLink to="/events" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
                            <span className="text-lg">📅</span>
                            Events
                        </NavLink>
                        <NavLink to="/community" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
                            <span className="text-lg">💬</span>
                            Community
                        </NavLink>
                    </>
                )}
            </nav>

        </aside>
    );
}