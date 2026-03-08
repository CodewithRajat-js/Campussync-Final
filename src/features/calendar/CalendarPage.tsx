import Layout from "../../components/layout/Layout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendar() {
    const events = [
        { title: "Mid Semester Exams", date: "2026-04-15" },
        { title: "Hackathon Registration", date: "2026-04-18" },
        { title: "Club Orientation", date: "2026-04-22" },
    ];

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-cocoa dark:text-sand mb-6">
                Academic Calendar
            </h1>

            <div className="bg-white dark:bg-walnut p-6 rounded-xl shadow-md">

                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    height="auto"
                />

            </div>
        </Layout>
    );
}
