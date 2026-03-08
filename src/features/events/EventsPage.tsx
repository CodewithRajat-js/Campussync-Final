import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import EventCard from "./EventCard";
import { getEvents, createEvent } from "../../api/eventApi";
import { useAuth } from "../../hooks/useAuth";

interface EventItem {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
}

export default function EventsPage() {
    const { user } = useAuth();
    const [events, setEvents] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Form state for creating an event
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [creating, setCreating] = useState(false);

    const loadEvents = async () => {
        setLoading(true);
        try {
            const data = await getEvents();
            setEvents(data);
        } catch (error) {
            console.error("Failed to load events", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const handleCreateEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        try {
            await createEvent({ title, description, date, location });
            // Reset form
            setTitle("");
            setDescription("");
            setDate("");
            setLocation("");
            // Reload events
            await loadEvents();
        } catch (error) {
            console.error("Failed to create event", error);
            alert("Failed to create event");
        } finally {
            setCreating(false);
        }
    };

    const canCreate = user?.role === "community_head" || user?.role === "admin";

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-cocoa dark:text-sand mb-6">
                Committee Events
            </h1>

            {canCreate && (
                <div className="bg-white dark:bg-walnut rounded-xl shadow-md p-6 mb-8">
                    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-ivory">Create New Event</h2>
                    <form onSubmit={handleCreateEvent} className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1 dark:text-ivory">Title</label>
                            <input required value={title} onChange={e => setTitle(e.target.value)} type="text" className="border rounded p-2 focus:ring-2 focus:ring-cocoa" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1 dark:text-ivory">Date</label>
                            <input required value={date} onChange={e => setDate(e.target.value)} type="text" placeholder="e.g. April 15, 2026" className="border rounded p-2 focus:ring-2 focus:ring-cocoa" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1 dark:text-ivory">Location</label>
                            <input required value={location} onChange={e => setLocation(e.target.value)} type="text" className="border rounded p-2 focus:ring-2 focus:ring-cocoa" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1 dark:text-ivory">Description</label>
                            <input value={description} onChange={e => setDescription(e.target.value)} type="text" className="border rounded p-2 focus:ring-2 focus:ring-cocoa" />
                        </div>
                        <div className="col-span-2">
                            <button disabled={creating} type="submit" className="bg-cocoa text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50">
                                {creating ? "Creating..." : "Create Event"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-10">
                    <p className="text-lg text-gray-500">Loading events...</p>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-6">
                    {events.map((event) => (
                        <EventCard
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            description={event.description}
                            date={event.date}
                            location={event.location}
                        />
                    ))}
                    {events.length === 0 && (
                        <p className="col-span-3 text-gray-500">No events found.</p>
                    )}
                </div>
            )}
        </Layout>
    );
}
