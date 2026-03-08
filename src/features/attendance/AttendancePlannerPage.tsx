import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getAttendance, createSubject, updateAttendance } from "../../api/attendanceApi";

interface AttendanceItem {
    id: number;
    subject: string;
    attended_classes: number;
    total_classes: number;
}

export default function AttendancePlannerPage() {
    const [records, setRecords] = useState<AttendanceItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state for creating a subject
    const [newSubject, setNewSubject] = useState("");
    const [creating, setCreating] = useState(false);

    const loadRecords = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAttendance();
            setRecords(data);
        } catch (err) {
            setError("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRecords();
    }, []);

    const handleCreateSubject = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        try {
            await createSubject({ subject: newSubject });
            setNewSubject("");
            await loadRecords();
        } catch (error) {
            console.error(error);
            alert("Failed to create subject.");
        } finally {
            setCreating(false);
        }
    };

    const handleUpdate = async (id: number, attended: number, total: number) => {
        try {
            await updateAttendance(id, { attended_classes: attended, total_classes: total });
            await loadRecords();
        } catch (error) {
            console.error(error);
            alert("Failed to update attendance.");
        }
    };

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-cocoa dark:text-sand mb-6">
                Attendance Planner
            </h1>

            <div className="bg-white dark:bg-walnut shadow-md rounded-xl p-6 max-w-lg mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-ivory">Add New Subject</h2>
                <form onSubmit={handleCreateSubject} className="flex gap-4">
                    <input
                        required
                        type="text"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        className="flex-1 p-2 border rounded-lg focus:ring-cocoa"
                        placeholder="Subject Name"
                    />
                    <button
                        type="submit"
                        disabled={creating || !newSubject.trim()}
                        className="bg-cocoa text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 whitespace-nowrap"
                    >
                        {creating ? "Adding..." : "Add Subject"}
                    </button>
                </form>
            </div>

            {loading && <p className="text-gray-500 mb-6">Loading data...</p>}
            {error && <p className="text-red-500 mb-6">{error}</p>}
            {!loading && !error && records.length === 0 && (
                <p className="text-gray-500">No attendance records found. Add a subject to start tracking.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {records.map((record) => {
                    const percentage = record.total_classes === 0 ? 0 : (record.attended_classes / record.total_classes) * 100;

                    let status = "Safe";
                    let color = "text-green-600";
                    if (percentage < 75) {
                        status = "Critical";
                        color = "text-red-600";
                    } else if (percentage < 80) {
                        status = "Warning";
                        color = "text-yellow-600";
                    }

                    return (
                        <div key={record.id} className="bg-white dark:bg-walnut p-6 rounded-xl shadow-md">
                            <h3 className="font-semibold text-lg text-gray-800 dark:text-ivory mb-4">{record.subject}</h3>

                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                                <span>Attended:</span>
                                <span>{record.attended_classes}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-4">
                                <span>Total:</span>
                                <span>{record.total_classes}</span>
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <span className={`font-bold text-xl ${color}`}>
                                    {percentage.toFixed(1)}%
                                </span>
                                <span className={`text-sm font-medium ${color}`}>
                                    {status}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleUpdate(record.id, record.attended_classes + 1, record.total_classes + 1)}
                                    className="flex-1 bg-green-100 text-green-700 py-2 rounded hover:bg-green-200 text-sm font-medium"
                                >
                                    + Attended
                                </button>
                                <button
                                    onClick={() => handleUpdate(record.id, record.attended_classes, record.total_classes + 1)}
                                    className="flex-1 bg-red-100 text-red-700 py-2 rounded hover:bg-red-200 text-sm font-medium"
                                >
                                    + Bunked
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Layout>
    );
}
