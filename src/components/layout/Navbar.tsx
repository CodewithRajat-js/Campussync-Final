import NotificationBell from "../ui/NotificationBell";
import Logo from "../ui/Logo";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <header className="w-full flex justify-between items-center px-6 py-4 shadow-sm border-b border-gray-100 bg-white dark:bg-neutral-900 dark:border-neutral-800 transition-colors">

            {/* Left side: Logo */}
            <div>
                {!user && <Logo />}
                {user && <span className="text-xl font-bold text-cocoa transition-colors">Workspace</span>}
            </div>

            {/* Right side: User menu / Notifications */}
            <div className="flex items-center gap-6">

                {user && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {user.name} <span className="text-gray-400 capitalize">({user.role.replace("_", " ")})</span>
                        </span>
                    </div>
                )}

                <NotificationBell />

                {user && (
                    <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-full bg-cocoa text-white flex items-center justify-center font-bold shadow-sm">
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                        </div>

                        <div className="flex gap-3">
                            <Link to="/profile" className="text-sm font-medium text-gray-600 hover:text-cocoa dark:text-gray-400 dark:hover:text-sand transition-colors">
                                Profile
                            </Link>

                            <button
                                onClick={logout}
                                className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
