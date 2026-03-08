import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Logo from "../../components/ui/Logo";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
    const { login, user } = useAuth();
    const navigate = useNavigate();

    // If authenticated, bounce to dashboard
    if (user) {
        return <Navigate to="/" replace />;
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await login(email, password);
            navigate("/"); // the ProtectedRoute handles redirection to dashboard
        } catch (err: any) {
            setError(err.response?.data?.error || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream to-white dark:from-neutral-900 dark:to-neutral-950 p-6">
            <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-8 transition-colors">

                <div className="flex justify-center mb-6">
                    <Logo className="w-10 h-10" />
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-ivory mb-2">
                        Welcome to CampusSync
                    </h1>
                    <p className="text-sm text-neutral-600 dark:text-gray-400">
                        Smart campus management platform
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@campus.edu"
                            className="w-full p-3 border border-gray-200 dark:border-neutral-700 rounded-lg bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-ivory focus:ring-2 focus:ring-cocoa outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full p-3 border border-gray-200 dark:border-neutral-700 rounded-lg bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-ivory focus:ring-2 focus:ring-cocoa outline-none transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full py-3 bg-cocoa hover:bg-black/80 dark:hover:bg-sand/90 text-white dark:hover:text-black font-semibold rounded-lg shadow-md transition-all disabled:opacity-70"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-neutral-600 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-semibold text-cocoa hover:underline">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}
