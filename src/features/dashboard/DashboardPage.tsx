import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import DashboardCard from "./DashboardCard";
import StatCard from "./StatCard";
import { useAuth } from "../../hooks/useAuth";
import api from "../../api/axios";
import { getEvents } from "../../api/eventApi";
import { getMeetings } from "../../api/meetingApi";
import { getPosts } from "../../api/postApi";

export default function Dashboard() {
    const { user } = useAuth();
    const role = user?.role;

    const [adminStats, setAdminStats] = useState({
        users: 0,
        events: 0,
        pending_posts: 0,
        pending_meetings: 0
    });

    const [events, setEvents] = useState<any[]>([]);
    const [meetings, setMeetings] = useState<any[]>([]);
    const [posts, setPosts] = useState<any[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadDashboardData = async () => {
        setLoading(true);
        setError(null);
        try {
            if (role === "admin") {
                const res = await api.get("/admin/stats");
                setAdminStats(res.data);
            } else {
                // Fetch dynamic data for other roles
                const [eventData, meetingData, postData] = await Promise.all([
                    getEvents().catch(() => ({ data: [] })),
                    (role === "teacher" || role === "student") ? getMeetings().catch(() => ({ data: [] })) : Promise.resolve({ data: [] }),
                    getPosts().catch(() => ({ data: [] }))
                ]);

                // Handle pagination wrapper if exists { data: [...] } else return array
                setEvents(eventData?.data || eventData || []);
                setMeetings(meetingData?.data || meetingData || []);
                setPosts(postData?.data || postData || []);
            }
        } catch (err) {
            setError("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    // Auto Refresh Dashboard After Login (Task 4)
    useEffect(() => {
        if (user) {
            loadDashboardData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-cocoa dark:text-sand mb-6">
                Dashboard
            </h1>

            {loading && <p className="text-gray-500 mb-6">Loading dashboard data...</p>}
            {error && <p className="text-red-500 mb-6">{error}</p>}

            {/* Admin Dashboard */}
            {role === "admin" && !loading && !error && (
                <>
                    <div className="grid grid-cols-4 gap-6 mb-8">
                        <StatCard label="Total Users" value={adminStats.users?.toString() || "0"} />
                        <StatCard label="Events" value={adminStats.events?.toString() || "0"} />
                        <StatCard label="Pending Posts" value={adminStats.pending_posts?.toString() || "0"} />
                        <StatCard label="Meeting Requests" value={adminStats.pending_meetings?.toString() || "0"} />
                    </div>
                </>
            )}

            {/* Teacher Dashboard */}
            {role === "teacher" && !loading && !error && (
                <>
                    <div className="grid grid-cols-4 gap-6 mb-8">
                        <StatCard label="Meeting Requests" value={meetings.length.toString()} />
                        <StatCard label="Upcoming Events" value={events.length.toString()} />
                    </div>
                </>
            )}

            {/* Student & Community Head Dashboard */}
            {(role === "student" || role === "community_head") && !loading && !error && (
                <>
                    <div className="grid grid-cols-4 gap-6 mb-8">
                        {role === "student" && <StatCard label="Attendance Summary" value="N/A" />}
                        <StatCard label="Upcoming Events" value={events.length.toString()} />
                        <StatCard label="Community Posts" value={posts.length.toString()} />
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <DashboardCard
                            title="Academic Calendar"
                            description="View upcoming exams, holidays and academic events."
                        />
                        <DashboardCard
                            title="Upcoming Events"
                            description="Stay updated with campus activities and committee events."
                        />
                        {role === "student" && (
                            <DashboardCard
                                title="Attendance Overview"
                                description="Track your attendance and maintain the required percentage."
                            />
                        )}
                    </div>
                </>
            )}
        </Layout>
    );
}
