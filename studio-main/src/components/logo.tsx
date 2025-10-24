import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2 text-xl font-bold font-headline text-primary-foreground", className)}>
        <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
        >
            <path d="M12 22V2" />
            <path d="M5 12H19" />
        </svg>
        <span className="text-foreground">SPAM</span>
    </div>
  );
};

export default Logo;
