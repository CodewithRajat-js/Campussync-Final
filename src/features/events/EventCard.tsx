import { useState } from "react";
import { Link } from "react-router-dom";
import { registerEvent } from "../../api/eventApi";

interface EventCardProps {
    id: number;
    title: string;
    description?: string;
    date: string;
    location: string;
}

export default function EventCard({ id, title, description, date, location }: EventCardProps) {
    const [registered, setRegistered] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleRegister() {
        setLoading(true);
        try {
            await registerEvent(id);
            setRegistered(true);
            alert("Successfully registered for event");
        } catch (error: any) {
            console.error("Failed to register", error);
            // Ignore 409 already registered to just show success visually
            if (error?.response?.status === 409) {
                setRegistered(true);
                alert("Already registered for this event");
            } else {
                alert("Failed to register for event");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white dark:bg-walnut rounded-xl shadow-md p-6 flex flex-col">
            <Link to={`/events/${id}`}>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-ivory hover:underline">
                    {title}
                </h3>
            </Link>

            {description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 flex-grow">
                    {description}
                </p>
            )}

            <p className="text-sm text-gray-500 dark:text-gray-300 mt-4">
                <span className="font-medium">Date:</span> {date}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-300">
                <span className="font-medium">Location:</span> {location}
            </p>

            <button
                onClick={handleRegister}
                disabled={registered || loading}
                className={`mt-4 px-4 py-2 rounded-lg text-white font-medium transition ${registered
                        ? "bg-green-600"
                        : "bg-cocoa hover:opacity-90"
                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                {loading ? "Registering..." : registered ? "Registered ✓" : "Register"}
            </button>
        </div>
    );
}
