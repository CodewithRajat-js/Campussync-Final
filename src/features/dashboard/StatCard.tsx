interface StatCardProps {
    label: string;
    value: string;
}

export default function StatCard({ label, value }: StatCardProps) {
    return (
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 flex flex-col justify-center transition-shadow hover:shadow-lg">

            <span className="text-sm text-gray-500 dark:text-gray-300">
                {label}
            </span>

            <span className="text-2xl font-bold text-cocoa dark:text-sand mt-1">
                {value}
            </span>

        </div>
    );
}
