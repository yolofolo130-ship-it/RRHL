interface ChampionBadgeProps {
  /** Number of championships won. Renders nothing if 0. */
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
      title={`${count}x Stanley Cup champion`}
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
          {/* mini Stanley Cup silhouette */}
          <path d="M7 3h10v2a5 5 0 0 1-5 5 5 5 0 0 1-5-5V3z" />
          <path d="M7 4H4.5a2.8 2.8 0 0 0 2.8 4.6A5 5 0 0 1 7 4z" />
          <path d="M17 4h2.5a2.8 2.8 0 0 1-2.8 4.6A5 5 0 0 0 17 4z" />
          <rect x="11" y="10" width="2" height="4" />
          <rect x="9" y="14" width="6" height="1.4" rx="0.4" />
          <rect x="7" y="15.6" width="10" height="2.2" rx="0.5" />
        </svg>
      </span>
      {count > 1 && (
        <span className="font-display text-sm font-bold text-amber-300">×{count}</span>
      )}
    </span>
  );
}
