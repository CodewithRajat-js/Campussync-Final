interface LogoProps {
    className?: string;
}

export default function Logo({ className }: LogoProps) {
    return (
        <div className="flex items-center gap-2">
            <img
                src="/logo.svg"
                alt="CampusSync Logo"
                className={`w-8 h-8 ${className || ""}`}
            />
            <span className="text-xl font-bold text-[#8B5E3C] tracking-wide">
                CampusSync
            </span>
        </div>
    );
}
