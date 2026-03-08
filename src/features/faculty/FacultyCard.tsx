import { useApp } from "../../hooks/useApp";

interface FacultyCardProps {
    name: string;
    subject: string;
    officeHours: string;
}

export default function FacultyCard({ name, subject, officeHours }: FacultyCardProps) {
    const { meetingRequests, setMeetingRequests, setNotifications } = useApp();

    const requestMeeting = () => {
        const newRequest = {
            id: Date.now(),
            student: "Current User", // Simplified for simulation
            subject: `Consultation: ${subject}`,
            teacher: name,
            time: officeHours
        };

        setMeetingRequests([...meetingRequests, newRequest]);
        setNotifications([{
            id: Date.now(),
            message: `Meeting request sent to ${name}`
        }, ...meetingRequests.map((_, i) => ({ id: i, message: '' }))].slice(0, 1)); // Hacky push notification

        alert(`Meeting request sent to ${name}`);
    };

    return (
        <div className="bg-white dark:bg-walnut rounded-xl shadow-md p-6 hover:shadow-lg transition">

            <h3 className="text-lg font-semibold text-gray-800 dark:text-ivory">
                {name}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                Subject: {subject}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-300">
                Office Hours: {officeHours}
            </p>

            <button
                onClick={requestMeeting}
                className="mt-4 px-4 py-2 bg-cocoa text-white rounded-lg hover:opacity-90 transition"
            >
                Request Meeting
            </button>

        </div>
    );
}

