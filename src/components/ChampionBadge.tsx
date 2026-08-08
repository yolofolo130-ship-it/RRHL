interface ChampionBadgeProps {
  /** Seasons won, e.g. ["Season 1", "Season 6"]. Renders nothing if empty. */
  seasons: string[];
  size?: "sm" | "lg";
}

// "Season 1" -> "S1"
const shortSeason = (season: string): string => `S${season.replace(/\D/g, "")}`;

export default function ChampionBadge({ seasons, size = "sm" }: ChampionBadgeProps) {
  if (seasons.length === 0) return null;

  const dims = size === "lg" ? "h-5 w-5" : "h-3.5 w-3.5";
  const textSize = size === "lg" ? "text-sm" : "text-[10px]";
  const padding = size === "lg" ? "px-3 py-1.5" : "px-2 py-1";

  return (
    <span
      className={`relative inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border border-amber-400/40 bg-amber-500/10 ${padding} shadow-[0_0_16px_-6px_rgba(251,191,36,0.6)]`}
      title={`Stanley Cup champion: ${seasons.join(", ")}`}
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
          {/* mini Stanley Cup silhouette */}
          <path d="M7 3h10v2a5 5 0 0 1-5 5 5 5 0 0 1-5-5V3z" />
          <path d="M7 4H4.5a2.8 2.8 0 0 0 2.8 4.6A5 5 0 0 1 7 4z" />
          <path d="M17 4h2.5a2.8 2.8 0 0 1-2.8 4.6A5 5 0 0 0 17 4z" />
          <rect x="11" y="10" width="2" height="4" />
          <rect x="9" y="14" width="6" height="1.4" rx="0.4" />
          <rect x="7" y="15.6" width="10" height="2.2" rx="0.5" />
        </svg>
      </span>
      <span className={`font-display font-bold uppercase tracking-wide text-amber-300 ${textSize}`}>
        {seasons.map(shortSeason).join(", ")} Champion
      </span>
    </span>
  );
}
