import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface RoleProtectedRouteProps {
    children: React.ReactNode;
    roles: string[];
}

export default function RoleProtectedRoute({ children, roles }: RoleProtectedRouteProps) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg text-gray-500">Loading...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!roles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
