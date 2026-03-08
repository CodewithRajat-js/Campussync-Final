import api from "./axios";

export const getAttendance = async () => {
    const res = await api.get("/attendance");
    return res.data;
};

export const createSubject = async (data: { subject: string }) => {
    const res = await api.post("/attendance", data);
    return res.data;
};

export const updateAttendance = async (
    id: number,
    data: { attended_classes: number; total_classes: number }
) => {
    const res = await api.patch(`/attendance/${id}`, data);
    return res.data;
};
