import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../hooks/useAuth";
import { getMeetings, createMeeting, updateMeeting } from "../../api/meetingApi";

interface MeetingItem {
    id: number;
    student_id: number;
    student_name: string;
    student_email: string;
    message: string;
    status: string;
    created_at: string;
}

export default function FacultyHubPage() {
    const { user } = useAuth();
    const isTeacher = user?.role === "teacher";

    // Student specific state
    const [teacherId, setTeacherId] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Teacher specific state
    const [requests, setRequests] = useState<MeetingItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadMeetings = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getMeetings();
            setRequests(data);
        } catch (err) {
            setError("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isTeacher) {
            loadMeetings();
        }
    }, [isTeacher]);

    const handleCreateRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await createMeeting({ teacher_id: Number(teacherId), message });
            alert("Meeting request sent successfully!");
            setTeacherId("");
            setMessage("");
        } catch (error) {
            console.error(error);
            alert("Failed to send meeting request.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdateStatus = async (id: number, status: string) => {
        try {
            await updateMeeting(id, { status });
            alert(`Meeting request ${status} successfully.`);
            await loadMeetings();
        } catch (error) {
            console.error(error);
            alert(`Failed to update meeting status.`);
        }
    };

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-cocoa dark:text-sand mb-6">
                Faculty Hub
            </h1>

            {/* Student View: Request Form */}
            {!isTeacher && (
                <div className="bg-white dark:bg-walnut shadow-md rounded-xl p-6 max-w-lg mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-ivory">Request a Meeting</h2>
                    <form onSubmit={handleCreateRequest} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teacher ID</label>
                            <input
                                required
                                type="number"
                                value={teacherId}
                                onChange={(e) => setTeacherId(e.target.value)}
                                className="w-full p-2 border rounded-lg focus:ring-cocoa"
                                placeholder="Enter Teacher ID"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message / Purpose</label>
                            <textarea
                                required
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-2 border rounded-lg focus:ring-cocoa min-h-[100px]"
                                placeholder="Why do you want to meet?"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-cocoa text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
                        >
                            {submitting ? "Sending..." : "Send Request"}
                        </button>
                    </form>
                </div>
            )}

            {/* Teacher View: Incoming Requests */}
            {isTeacher && (
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-ivory">Meeting Requests</h2>
                    {loading && <p className="text-gray-500">Loading data...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!loading && !error && requests.length === 0 && (
                        <p className="text-gray-500">No meeting requests at the moment.</p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {requests.map(req => (
                            <div key={req.id} className="bg-white dark:bg-walnut rounded-xl shadow-md p-6">
                                <h3 className="font-semibold text-lg text-gray-800 dark:text-ivory">From: {req.student_name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">{req.student_email}</p>
                                <p className="text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 p-3 rounded mb-4">
                                    "{req.message}"
                                </p>
                                <p className="text-xs text-gray-400 mb-4">
                                    Status: <span className="font-medium text-gray-600 dark:text-gray-300">{req.status}</span> |
                                    Sent: {new Date(req.created_at).toLocaleDateString()}
                                </p>

                                {req.status === 'pending' && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleUpdateStatus(req.id, 'approved')}
                                            className="bg-green-600 text-white px-3 py-1.5 rounded text-sm hover:bg-green-700"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(req.id, 'rejected')}
                                            className="bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Layout>
    );
}
