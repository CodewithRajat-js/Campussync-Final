import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import PostCard from "./PostCard";
import { getPosts, createPost } from "../../api/postApi";
import { useAuth } from "../../hooks/useAuth";

interface PostItem {
    id: number;
    title: string;
    content: string;
    author: string;
    created_at: string;
}

export default function Community() {
    const { user } = useAuth();

    const [posts, setPosts] = useState<PostItem[]>([]);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const loadPosts = async () => {
        setLoading(true);
        try {
            const data = await getPosts();
            setPosts(data);
        } catch (error) {
            console.error("Failed to load posts", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const handleCreatePost = async () => {
        if (!title.trim() || !content.trim()) return;

        setSubmitting(true);
        try {
            await createPost({ title, content });

            setTitle("");
            setContent("");

            alert("Your post was submitted for admin approval");

            await loadPosts();
        } catch (error) {
            console.error("Failed to create post", error);
            alert("Failed to create post");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-cocoa dark:text-sand mb-6">
                Community Board
            </h1>

            {/* Create Post */}
            {user && (
                <div className="bg-white dark:bg-walnut p-6 rounded-xl shadow-md mb-6">
                    <input
                        type="text"
                        placeholder="Post title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full mb-3 p-2 border rounded-lg focus:ring-2 focus:ring-cocoa outline-none"
                        disabled={submitting}
                    />

                    <textarea
                        placeholder="Write something..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full mb-3 p-2 border rounded-lg focus:ring-2 focus:ring-cocoa outline-none min-h-[100px]"
                        disabled={submitting}
                    />

                    <button
                        onClick={handleCreatePost}
                        disabled={submitting || !title.trim() || !content.trim()}
                        className="px-4 py-2 bg-cocoa text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition"
                    >
                        {submitting ? "Posting..." : "Post"}
                    </button>
                </div>
            )}

            {/* Posts */}
            {loading ? (
                <div className="flex justify-center py-10">
                    <p className="text-lg text-gray-500">Loading community posts...</p>
                </div>
            ) : posts.length === 0 ? (
                <p className="text-gray-500">No approved posts yet. Be the first to post!</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            title={post.title}
                            content={post.content}
                            author={post.author || "Student"}
                        />
                    ))}
                </div>
            )}
        </Layout>
    );
}
