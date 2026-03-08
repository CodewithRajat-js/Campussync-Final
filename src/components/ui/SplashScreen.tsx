export default function SplashScreen() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4E8D8]">
            <img
                src="/logo.svg"
                alt="CampusSync Logo"
                className="w-16 h-16 mb-4"
            />
            <h1 className="text-3xl font-bold text-[#8B5E3C] mb-2">
                CampusSync
            </h1>
            <p className="text-gray-500 mt-2">
                Smart Campus Management
            </p>
            <div className="mt-6 w-6 h-6 border-2 border-[#8B5E3C] border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}
