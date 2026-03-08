interface DashboardCardProps {
    title: string;
    description?: string;
}

export default function DashboardCard({ title, description }: DashboardCardProps) {
    return (
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 transition-shadow hover:shadow-lg">

            <h3 className="text-lg font-semibold text-gray-800 dark:text-ivory mb-2">
                {title}
            </h3>

            {description && (
                <p className="text-sm text-gray-500 dark:text-gray-300">
                    {description}
                </p>
            )}

        </div>
    );
}
