import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-screen bg-cream dark:bg-espresso text-gray-800 dark:text-ivory">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Section */}
            <div className="flex flex-col flex-1">

                {/* Top Navbar */}
                <Navbar />

                {/* Page Content */}
                <main className="flex-1 p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}
