import api from "./axios";

export const createMeeting = async (data: {
    teacher_id: number;
    message: string;
}) => {
    const res = await api.post("/meetings", data);
    return res.data;
};

export const getMeetings = async () => {
    const res = await api.get("/meetings");
    return res.data;
};

export const updateMeeting = async (id: number, data: { status: string }) => {
    const res = await api.patch(`/meetings/${id}`, data);
    return res.data;
};
