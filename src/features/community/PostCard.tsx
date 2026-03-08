interface PostCardProps {
    title: string;
    content: string;
    author: string;
}

export default function PostCard({ title, content, author }: PostCardProps) {
    return (
        <div className="bg-white dark:bg-walnut rounded-xl shadow-md p-6 mb-4">

            <h3 className="text-lg font-semibold text-gray-800 dark:text-ivory">
                {title}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {content}
            </p>

            <div className="text-xs text-gray-400 mt-3">
                Posted by {author}
            </div>

        </div>
    );
}
