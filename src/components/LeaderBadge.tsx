import { formatOrdinal } from "@/utils/format";

interface LeaderBadgeProps {
  label: string;
  rank: number;
}

// "#4th in Assists" / "#1st in Scoring" — shown on a player's page when
// they place in a league-wide stat leaderboard.
export default function LeaderBadge({ label, rank }: LeaderBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-emerald-400/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold tracking-[0.15em] text-emerald-300">
      #{formatOrdinal(rank).toUpperCase()} IN {label.toUpperCase()}
    </span>
  );
}
