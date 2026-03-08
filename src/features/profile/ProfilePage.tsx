import { Navigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../hooks/useAuth";

export default function ProfilePage() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[50vh]">
                    <p className="text-lg text-gray-500">Loading profile...</p>
                </div>
            </Layout>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Role-based avatar assignment 
    const getAvatar = (role: string) => {
        switch (role) {
            case "teacher": return "👨‍🏫";
            case "admin": return "⚙️";
            case "community_head": return "🤖";
            default: return "👤"; // student
        }
    };

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-cocoa dark:text-sand mb-6">User Profile</h1>

            <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-md max-w-2xl border border-gray-100 dark:border-neutral-700 transition hover:shadow-lg">
                <div className="flex items-center gap-6 mb-8">
                    <div className="text-6xl p-4 bg-sand dark:bg-cocoa rounded-full shadow-inner">
                        {getAvatar(user.role)}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-ivory">{user.name}</h2>
                        <p className="text-cocoa font-semibold uppercase tracking-wider text-sm">{user.role.replace('_', ' ')}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500 uppercase font-bold">Account ID</p>
                        <p className="text-lg font-medium text-gray-800 dark:text-sand">CSync-{user.id.toString().padStart(4, "0")}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500 uppercase font-bold">Email Address</p>
                        <p className="text-lg font-medium text-gray-800 dark:text-sand">{user.email}</p>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700">
                    <button className="px-6 py-2 bg-cocoa text-white rounded-lg shadow-md hover:bg-black/80 dark:hover:bg-sand/90 dark:hover:text-black font-semibold transition-all">
                        Edit Profile
                    </button>
                </div>
            </div>
        </Layout>
    );
}
