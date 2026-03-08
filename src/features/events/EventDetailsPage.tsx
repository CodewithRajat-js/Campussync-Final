import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useApp } from "../../hooks/useApp";

export default function EventDetails() {

    const { id } = useParams();
    const { events } = useApp();

    const event = events.find(e => e.id === Number(id));

    if (!event) {
        return (
            <Layout>
                <p>Event not found</p>
            </Layout>
        );
    }

    return (
        <Layout>

            <h1 className="text-3xl font-bold text-cocoa mb-6">
                {event.title}
            </h1>

            <div className="bg-white dark:bg-walnut p-6 rounded-xl shadow-md">

                <p className="mb-2">
                    <b>Date:</b> {event.date}
                </p>

                <p className="mb-2">
                    <b>Location:</b> {event.location}
                </p>

                <p className="mb-4">
                    This event is organized by the campus community.
                    More details will be available soon.
                </p>

                <button className="px-4 py-2 bg-cocoa text-white rounded-lg">
                    Register
                </button>

            </div>

        </Layout>
    );
}
