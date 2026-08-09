interface HallOfFameBadgeProps {
  size?: "sm" | "lg";
}

export default function HallOfFameBadge({ size = "sm" }: HallOfFameBadgeProps) {
  const dims = size === "lg" ? "h-5 w-5" : "h-3.5 w-3.5";
  const textSize = size === "lg" ? "text-sm" : "text-[10px]";
  const padding = size === "lg" ? "px-3 py-1.5" : "px-2 py-1";

  return (
    <span
      className={`relative inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border border-amber-400/40 bg-amber-500/10 ${padding} shadow-[0_0_16px_-6px_rgba(251,191,36,0.6)]`}
      title="Hall of Fame inductee"
    >
      <span className="relative inline-flex shrink-0 items-center justify-center">
        <span
          className="pointer-events-none absolute -inset-1 animate-glow-pulse rounded-full bg-amber-400/50 blur-md"
          aria-hidden
        />
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`relative ${dims} text-amber-300`}
          aria-hidden
        >
          {/* star */}
          <path d="M12 2l2.9 6.26L21.5 9l-5 4.6L17.8 21 12 17.3 6.2 21l1.3-7.4-5-4.6 6.6-.74L12 2z" />
        </svg>
      </span>
      <span className={`font-display font-bold uppercase tracking-wide text-amber-300 ${textSize}`}>
        Hall of Fame
      </span>
    </span>
  );
}
