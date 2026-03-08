import api from "./axios";

export const getEvents = async () => {
    const res = await api.get("/events");
    return res.data;
};

export const createEvent = async (data: {
    title: string;
    description?: string;
    date: string;
    location: string;
}) => {
    const res = await api.post("/events", data);
    return res.data;
};

export const registerEvent = async (eventId: number) => {
    const res = await api.post(`/events/${eventId}/register`);
    return res.data;
};
