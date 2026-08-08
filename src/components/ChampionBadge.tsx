interface ChampionBadgeProps {
  /** Number of Stanley Cup MVP wins. Renders nothing if 0. */
  count: number;
  size?: "sm" | "lg";
}

export default function ChampionBadge({ count, size = "sm" }: ChampionBadgeProps) {
  if (count === 0) return null;

  const dims = size === "lg" ? "h-8 w-8" : "h-4 w-4";
  const glowInset = size === "lg" ? "-inset-2" : "-inset-1";

  return (
    <span
      className="relative inline-flex shrink-0 items-center gap-1"
      title={`${count}x Stanley Cup MVP`}
    >
      <span className="relative inline-flex items-center justify-center">
        <span
          className={`pointer-events-none absolute ${glowInset} animate-glow-pulse rounded-full bg-amber-400/50 blur-md`}
          aria-hidden
        />
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`relative ${dims} text-amber-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]`}
          aria-hidden
        >
          <path d="M3 18h18l-1.4-8.4-4.6 3.6-3-6-3 6-4.6-3.6L3 18z" />
          <rect x="3" y="19" width="18" height="2" rx="0.5" />
        </svg>
      </span>
      {count > 1 && (
        <span className="font-display text-sm font-bold text-amber-300">×{count}</span>
      )}
    </span>
  );
}
