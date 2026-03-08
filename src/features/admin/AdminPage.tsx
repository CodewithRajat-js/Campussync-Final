import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function Admin() {

    const [pendingPosts, setPendingPosts] = useState([
        {
            title: "Need teammates for ML hackathon",
            content: "Looking for 2 members",
            author: "Student"
        }
    ]);

    const [events, setEvents] = useState([
        {
            title: "Hackathon 2026",
            date: "April 18",
            location: "Innovation Lab"
        }
    ]);

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");

    function approvePost(index: number) {
        setPendingPosts(pendingPosts.filter((_, i) => i !== index));
    }

    function createEvent() {
        if (!title || !date || !location) return;

        const newEvent = { title, date, location };

        setEvents([newEvent, ...events]);

        setTitle("");
        setDate("");
        setLocation("");
    }

    return (
        <Layout>

            <h1 className="text-3xl font-bold text-cocoa dark:text-sand mb-6">
                Admin Panel
            </h1>

            <div className="bg-white dark:bg-walnut p-6 rounded-xl shadow-md mb-8">

                <h2 className="text-xl font-semibold mb-4">
                    Pending Community Posts
                </h2>

                {pendingPosts.map((post, index) => (
                    <div key={index} className="mb-4 border-b pb-3">

                        <h3 className="font-semibold">{post.title}</h3>

                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            {post.content}
                        </p>

                        <button
                            onClick={() => approvePost(index)}
                            className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
                        >
                            Approve
                        </button>

                    </div>
                ))}

            </div>

            <div className="bg-white dark:bg-walnut p-6 rounded-xl shadow-md">

                <h2 className="text-xl font-semibold mb-4">
                    Create Event
                </h2>

                <input
                    type="text"
                    placeholder="Event title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mb-3 p-2 border rounded-lg"
                />

                <input
                    type="text"
                    placeholder="Event date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full mb-3 p-2 border rounded-lg"
                />

                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full mb-3 p-2 border rounded-lg"
                />

                <button
                    onClick={createEvent}
                    className="px-4 py-2 bg-cocoa text-white rounded-lg"
                >
                    Create Event
                </button>

            </div>

        </Layout>
    );
}
