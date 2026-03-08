import { useState, useEffect } from "react";
import { getNotifications, markNotificationRead } from "../../api/notificationApi";

interface Notification {
    id: number;
    message: string;
    is_read: boolean;
    created_at: string;
}

export default function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [open, setOpen] = useState(false);

    const loadNotifications = async () => {
        try {
            const data = await getNotifications();
            setNotifications(data);
        } catch (error) {
            console.error("Failed to load notifications", error);
        }
    };

    useEffect(() => {
        loadNotifications();
        // Option to poll every 30s
        const interval = setInterval(loadNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleMarkRead = async (id: number) => {
        try {
            await markNotificationRead(id);
            setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
        } catch (error) {
            console.error("Failed to mark notification as read", error);
        }
    };

    const unreadCount = notifications.filter(n => !n.is_read).length;

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="relative text-xl"
            >
                🔔
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-[5px] rounded-full">
                        {unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-walnut shadow-lg rounded-lg p-4 z-50 max-h-96 overflow-y-auto">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-gray-800 dark:text-ivory">
                            Notifications
                        </h3>
                    </div>

                    {notifications.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">
                            No notifications yet
                        </p>
                    )}

                    <div className="flex flex-col gap-2">
                        {notifications.map((n) => (
                            <div
                                key={n.id}
                                className={`text-sm p-3 rounded-lg border-l-4 transition-colors ${n.is_read
                                        ? "bg-gray-50 dark:bg-gray-800 border-gray-300 text-gray-600 dark:text-gray-400"
                                        : "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-gray-800 dark:text-gray-200 shadow-sm"
                                    }`}
                            >
                                <p className="mb-1">{n.message}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs text-gray-400">
                                        {new Date(n.created_at).toLocaleDateString()}
                                    </span>
                                    {!n.is_read && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleMarkRead(n.id);
                                            }}
                                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            Mark as read
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
