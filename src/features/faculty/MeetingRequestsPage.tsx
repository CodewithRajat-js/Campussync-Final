import Layout from "../../components/layout/Layout";
import { useApp } from "../../hooks/useApp";

export default function MeetingRequests() {

    const { meetingRequests, setMeetingRequests, setNotifications } = useApp();

    function approveRequest(id: number) {
        const req = meetingRequests.find(r => r.id === id);
        setMeetingRequests(meetingRequests.filter(r => r.id !== id));
        if (req) {
            setNotifications([{
                id: Date.now(),
                message: `Meeting with ${req.student} approved for ${req.time}`
            }, ...[]]); // Add to notifications
        }
    }

    function rejectRequest(id: number) {
        setMeetingRequests(meetingRequests.filter(r => r.id !== id));
    }

    return (
        <Layout>

            <h1 className="text-3xl font-bold text-cocoa mb-6">
                Meeting Requests
            </h1>

            <div className="bg-white dark:bg-walnut p-6 rounded-xl shadow-md">

                {meetingRequests.length === 0 && (
                    <p className="text-gray-500">No pending meeting requests.</p>
                )}

                {meetingRequests.map((req) => (
                    <div key={req.id} className="border-b pb-4 mb-4">

                        <h3 className="font-semibold">
                            {req.student}
                        </h3>

                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Topic: {req.subject}
                        </p>

                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Time: {req.time}
                        </p>

                        <div className="mt-2 flex gap-2">

                            <button
                                onClick={() => approveRequest(req.id)}
                                className="px-3 py-1 bg-green-600 text-white rounded"
                            >
                                Accept
                            </button>

                            <button
                                onClick={() => rejectRequest(req.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded"
                            >
                                Reject
                            </button>

                        </div>

                    </div>
                ))}

            </div>

        </Layout>
    );
}

