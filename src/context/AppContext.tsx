/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
}

interface Notification {
    id: number;
    message: string;
}

interface MeetingRequest {
    id: number;
    student: string;
    subject: string;
    teacher: string;
    time: string;
}

interface AppContextType {
    events: Event[];
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>;

    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;

    pendingPosts: Post[];
    setPendingPosts: React.Dispatch<React.SetStateAction<Post[]>>;

    notifications: Notification[];
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;

    meetingRequests: MeetingRequest[];
    setMeetingRequests: React.Dispatch<React.SetStateAction<MeetingRequest[]>>;
}

export const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {

    const [events, setEvents] = useState<Event[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [pendingPosts, setPendingPosts] = useState<Post[]>([]);
    const [meetingRequests, setMeetingRequests] = useState<MeetingRequest[]>([]);

    return (
        <AppContext.Provider
            value={{
                events,
                setEvents,
                posts,
                setPosts,
                pendingPosts,
                setPendingPosts,
                notifications,
                setNotifications,
                meetingRequests,
                setMeetingRequests
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
