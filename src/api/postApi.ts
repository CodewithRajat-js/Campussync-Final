import api from "./axios";

export const getPosts = async () => {
    const res = await api.get("/posts");
    return res.data;
};

export const createPost = async (data: {
    title: string;
    content: string;
}) => {
    const res = await api.post("/posts", data);
    return res.data;
};

export const approvePost = async (id: number) => {
    const res = await api.patch(`/posts/${id}/approve`);
    return res.data;
};
