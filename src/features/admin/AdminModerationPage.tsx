import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import api from "../../api/axios"; // Specifically importing api to get pending posts since it's not in postApi
import { approvePost } from "../../api/postApi";

interface PendingPost {
    id: number;
    title: string;
    content: string;
    author: string;
    created_at: string;
}

export default function AdminModeration() {
    const [pendingPosts, setPendingPosts] = useState<PendingPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<number | null>(null);

    const loadPendingPosts = async () => {
        setLoading(true);
        try {
            // Re-using axios for the /admin/posts/pending endpoint built previously
            const res = await api.get("/admin/posts/pending");
            setPendingPosts(res.data);
        } catch (error) {
            console.error("Failed to load pending posts", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPendingPosts();
    }, []);

    const handleApprove = async (postId: number) => {
        setProcessingId(postId);
        try {
            await approvePost(postId);
            alert("Post approved successfully");
            await loadPendingPosts();
        } catch (error) {
            console.error("Failed to approve post", error);
            alert("Failed to approve post");
            setProcessingId(null);
        }
    };

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-cocoa mb-6">
                Admin Moderation
            </h1>

            {loading ? (
                <div className="flex justify-center py-10">
                    <p className="text-lg text-gray-500">Loading pending posts...</p>
                </div>
            ) : pendingPosts.length === 0 ? (
                <div className="bg-white dark:bg-walnut p-6 rounded-xl shadow-md">
                    <p className="text-gray-500">No posts pending approval.</p>
                </div>
            ) : (
                pendingPosts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white dark:bg-walnut p-6 rounded-xl shadow-md mb-4"
                    >
                        <h3 className="font-semibold text-lg dark:text-ivory">
                            {post.title}
                        </h3>

                        <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                            {post.content}
                        </p>

                        <p className="text-xs text-gray-400 mt-3">
                            Author: {post.author || "Student"} | Submitted: {new Date(post.created_at).toLocaleDateString()}
                        </p>

                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => handleApprove(post.id)}
                                disabled={processingId === post.id}
                                className="px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
                            >
                                {processingId === post.id ? "Approving..." : "Approve"}
                            </button>
                        </div>
                    </div>
                ))
            )}
        </Layout>
    );
}
